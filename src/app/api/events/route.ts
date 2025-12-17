import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, where, orderBy, limit as firestoreLimit, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Event, EventCategory, EventStatus } from '@/lib/types';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // Query parameters
        const status = searchParams.get('status') as EventStatus | null;
        const category = searchParams.get('category') as EventCategory | null;
        const region = searchParams.get('region');
        const state = searchParams.get('state');
        const limit = parseInt(searchParams.get('limit') || '50');
        const featured = searchParams.get('featured') === 'true';

        // Build Firestore query
        let eventsQuery = query(collection(db, 'events'));

        // Filter by category
        if (category) {
            eventsQuery = query(eventsQuery, where('category', '==', category));
        }

        // Filter by state
        if (state) {
            eventsQuery = query(eventsQuery, where('state', '==', state));
        }

        // Filter by region
        if (region) {
            eventsQuery = query(eventsQuery, where('region', '==', region));
        }

        // Filter by featured
        if (featured) {
            eventsQuery = query(eventsQuery, where('featured', '==', true));
        }

        // Order by start date
        eventsQuery = query(eventsQuery, orderBy('startDate', 'asc'));

        // Apply limit
        if (limit) {
            eventsQuery = query(eventsQuery, firestoreLimit(limit));
        }

        // Execute query
        const querySnapshot = await getDocs(eventsQuery);

        let events: Event[] = [];
        querySnapshot.forEach((doc) => {
            events.push({
                id: doc.id,
                ...doc.data(),
            } as Event);
        });

        // Client-side filtering by status (since Firestore doesn't support complex date comparisons easily)
        if (status) {
            const now = new Date();
            events = events.filter(event => {
                const startDate = event.startDate instanceof Timestamp
                    ? event.startDate.toDate()
                    : new Date(event.startDate);
                const endDate = event.endDate instanceof Timestamp
                    ? event.endDate.toDate()
                    : new Date(event.endDate);

                if (status === 'upcoming') {
                    return now < startDate;
                } else if (status === 'ongoing') {
                    return now >= startDate && now <= endDate;
                } else if (status === 'past') {
                    return now > endDate;
                }
                return true;
            });
        }

        // Sort by priority if featured
        if (featured) {
            events.sort((a, b) => (a.priority || 999) - (b.priority || 999));
        }

        return NextResponse.json({
            success: true,
            count: events.length,
            events,
        });

    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch events',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

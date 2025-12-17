import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Event } from '@/lib/types';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Event ID is required',
                },
                { status: 400 }
            );
        }

        // Fetch event from Firestore
        const eventDoc = await getDoc(doc(db, 'events', id));

        if (!eventDoc.exists()) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Event not found',
                },
                { status: 404 }
            );
        }

        const event: Event = {
            id: eventDoc.id,
            ...eventDoc.data(),
        } as Event;

        return NextResponse.json({
            success: true,
            event,
        });

    } catch (error) {
        console.error('Error fetching event:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch event',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

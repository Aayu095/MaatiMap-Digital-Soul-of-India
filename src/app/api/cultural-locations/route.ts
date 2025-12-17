import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, limit as firestoreLimit, getDocs } from 'firebase/firestore';

/**
 * GET /api/cultural-locations
 * Fetch cultural locations with optional filtering
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Get query parameters
        const state = searchParams.get('state');
        const category = searchParams.get('category');
        const minZoom = searchParams.get('minZoom');
        const limit = parseInt(searchParams.get('limit') || '100');

        let q = query(collection(db, 'cultural_locations'));

        // Apply filters
        if (state) {
            q = query(q, where('state', '==', state));
        }

        if (category) {
            q = query(q, where('category', '==', category));
        }

        if (minZoom) {
            q = query(q, where('minZoom', '<=', parseInt(minZoom)));
        }

        // Apply limit
        q = query(q, firestoreLimit(limit));

        const snapshot = await getDocs(q);

        const locations = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json({
            locations,
            count: locations.length,
        });
    } catch (error) {
        console.error('Error fetching cultural locations:', error);
        return NextResponse.json(
            { error: 'Failed to fetch cultural locations', details: String(error) },
            { status: 500 }
        );
    }
}

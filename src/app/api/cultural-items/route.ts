import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

/**
 * GET /api/cultural-items
 * Fetch cultural items with optional filters
 * Query params: state, category, limit, featured
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const stateFilter = searchParams.get('state');
        const categoryFilter = searchParams.get('category');
        const limitParam = searchParams.get('limit');
        const featuredOnly = searchParams.get('featured') === 'true';

        // Build Firestore query
        let q = query(collection(db, 'culturalItems'));

        // Apply filters
        if (stateFilter) {
            q = query(q, where('state', '==', stateFilter));
        }

        if (categoryFilter) {
            q = query(q, where('category', '==', categoryFilter));
        }

        if (featuredOnly) {
            q = query(q, where('featured', '==', true));
        }

        // Apply limit
        const itemLimit = limitParam ? parseInt(limitParam) : 50;
        q = query(q, limit(itemLimit));

        // Execute query
        const snapshot = await getDocs(q);

        // Convert to array
        const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json({
            success: true,
            count: items.length,
            items,
        });

    } catch (error) {
        console.error('Error fetching cultural items:', error);
        return NextResponse.json(
            { error: 'Failed to fetch cultural items', details: String(error) },
            { status: 500 }
        );
    }
}

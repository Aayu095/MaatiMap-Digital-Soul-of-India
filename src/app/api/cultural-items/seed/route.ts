import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { culturalItemsSeedData } from '@/lib/culturalItemsSeedData';

/**
 * POST /api/cultural-items/seed
 * Development-only endpoint to seed cultural items data
 * Requires authorization header with secret key
 */
export async function POST(request: NextRequest) {
    try {
        // Security check - only allow in development
        if (process.env.NODE_ENV === 'production') {
            return NextResponse.json(
                { error: 'This endpoint is only available in development' },
                { status: 403 }
            );
        }

        // Check authorization
        const authHeader = request.headers.get('authorization');
        const expectedAuth = `Bearer ${process.env.SEED_SECRET_KEY || 'dev-secret-key'}`;

        if (authHeader !== expectedAuth) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const culturalItemsRef = collection(db, 'culturalItems');
        const itemIds: string[] = [];

        console.log(`Starting to seed ${culturalItemsSeedData.length} cultural items...`);

        for (const item of culturalItemsSeedData) {
            // Generate ID from title (lowercase, replace spaces with hyphens)
            const id = item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

            await setDoc(doc(culturalItemsRef, id), {
                ...item,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            itemIds.push(id);
            console.log(`✓ Seeded: ${item.title} (${item.state})`);
        }

        console.log('Seeding complete!');

        return NextResponse.json({
            success: true,
            message: `Successfully seeded ${itemIds.length} cultural items`,
            itemIds,
        });

    } catch (error) {
        console.error('Seed endpoint error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: String(error) },
            { status: 500 }
        );
    }
}

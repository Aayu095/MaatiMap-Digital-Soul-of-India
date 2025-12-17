import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { eventSeedData } from '@/lib/eventSeedData';

export async function POST(request: NextRequest) {
    try {
        // Security check: Only allow in development
        if (process.env.NODE_ENV === 'production') {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Seed endpoint is only available in development mode',
                },
                { status: 403 }
            );
        }

        // Optional: Add a secret key check for extra security
        const authHeader = request.headers.get('authorization');
        const secretKey = process.env.SEED_SECRET_KEY || 'dev-secret-key';

        if (authHeader !== `Bearer ${secretKey}`) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Unauthorized',
                },
                { status: 401 }
            );
        }

        const eventsCollection = collection(db, 'events');
        const seededEvents: string[] = [];

        // Seed all events
        for (const eventData of eventSeedData) {
            // Convert Date objects to Firestore Timestamps
            const eventWithTimestamps = {
                ...eventData,
                startDate: Timestamp.fromDate(new Date(eventData.startDate)),
                endDate: Timestamp.fromDate(new Date(eventData.endDate)),
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            };

            const docRef = await addDoc(eventsCollection, eventWithTimestamps);
            seededEvents.push(docRef.id);

            console.log(`Seeded event: ${eventData.title} (ID: ${docRef.id})`);
        }

        return NextResponse.json({
            success: true,
            message: `Successfully seeded ${seededEvents.length} events`,
            eventIds: seededEvents,
        });

    } catch (error) {
        console.error('Error seeding events:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to seed events',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

// GET endpoint to check seed status
export async function GET() {
    return NextResponse.json({
        message: 'Event seed endpoint. Use POST with authorization to seed data.',
        environment: process.env.NODE_ENV,
        available: process.env.NODE_ENV !== 'production',
    });
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { geocodeLocation, extractLocationString, getStateCenterCoordinates } from '@/lib/geocodingUtils';

/**
 * POST /api/geocode-items
 * Development-only endpoint to add coordinates to cultural items
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

        // Get all cultural items from Firestore
        const culturalItemsRef = collection(db, 'culturalItems');
        const snapshot = await getDocs(culturalItemsRef);

        const results = {
            total: snapshot.size,
            processed: 0,
            successful: 0,
            failed: 0,
            skipped: 0,
            errors: [] as string[],
        };

        console.log(`Starting geocoding for ${results.total} items...`);

        for (const docSnapshot of snapshot.docs) {
            const item = docSnapshot.data();
            results.processed++;

            // Skip if already has coordinates
            if (item.latitude && item.longitude) {
                console.log(`Skipping ${item.title} - already has coordinates`);
                results.skipped++;
                continue;
            }

            try {
                // Extract location string
                const locationString = extractLocationString({
                    title: item.title,
                    region: item.region,
                    state: item.state,
                    tags: item.tags,
                });

                console.log(`Geocoding: ${locationString}`);

                // Try to geocode
                let geocodeResult = await geocodeLocation(locationString);

                // If geocoding fails, try state center as fallback
                if (!geocodeResult && item.state) {
                    console.log(`Geocoding failed, using state center for ${item.state}`);
                    geocodeResult = getStateCenterCoordinates(item.state);
                }

                if (geocodeResult) {
                    // Update Firestore document
                    await updateDoc(doc(db, 'culturalItems', docSnapshot.id), {
                        latitude: geocodeResult.latitude,
                        longitude: geocodeResult.longitude,
                        formattedAddress: geocodeResult.formattedAddress,
                    });

                    console.log(`✓ Successfully geocoded: ${item.title}`);
                    results.successful++;
                } else {
                    console.error(`✗ Failed to geocode: ${item.title}`);
                    results.failed++;
                    results.errors.push(`Failed to geocode: ${item.title}`);
                }

                // Add delay to respect Nominatim rate limit (1 req/sec)
                await new Promise(resolve => setTimeout(resolve, 1000));

            } catch (error) {
                console.error(`Error processing ${item.title}:`, error);
                results.failed++;
                results.errors.push(`Error processing ${item.title}: ${error}`);
            }
        }

        console.log('Geocoding complete!', results);

        return NextResponse.json({
            success: true,
            message: `Geocoding complete: ${results.successful} successful, ${results.failed} failed, ${results.skipped} skipped`,
            results,
        });

    } catch (error) {
        console.error('Geocoding endpoint error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: String(error) },
            { status: 500 }
        );
    }
}

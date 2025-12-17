import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import type { CulturalItem } from '@/lib/types';

/**
 * GET /api/cultural-items/nearby
 * Find cultural items near a given location using MongoDB's built-in $near operator (KNN)
 * 
 * Query Parameters:
 * - lat: Latitude (required)
 * - lng: Longitude (required)
 * - radius: Search radius in meters (default: 50000 = 50km)
 * - limit: Maximum number of results (default: 20)
 * - category: Filter by category (optional)
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const latStr = searchParams.get('lat');
    const lngStr = searchParams.get('lng');
    const radiusStr = searchParams.get('radius');
    const limitStr = searchParams.get('limit');
    const category = searchParams.get('category');

    // Validate required parameters
    if (!latStr || !lngStr) {
        return NextResponse.json(
            { error: 'Latitude and longitude are required', code: 'MISSING_COORDINATES' },
            { status: 400 }
        );
    }

    const latitude = parseFloat(latStr);
    const longitude = parseFloat(lngStr);

    if (isNaN(latitude) || isNaN(longitude)) {
        return NextResponse.json(
            { error: 'Invalid latitude or longitude', code: 'INVALID_COORDINATES' },
            { status: 400 }
        );
    }

    // Validate coordinate ranges
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return NextResponse.json(
            { error: 'Coordinates out of range', code: 'COORDINATES_OUT_OF_RANGE' },
            { status: 400 }
        );
    }

    const radius = radiusStr ? parseInt(radiusStr) : 50000; // Default 50km
    const limit = limitStr ? parseInt(limitStr) : 20;

    try {
        const db = await getDb();
        const collection = db.collection('culturalItems');

        // Build MongoDB query with $near operator (KNN - K-Nearest Neighbors)
        const query: any = {
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude] // MongoDB uses [lng, lat] order
                    },
                    $maxDistance: radius // in meters
                }
            }
        };

        // Add category filter if provided
        if (category && category !== 'all') {
            query.category = category;
        }

        // Execute geospatial query
        // MongoDB automatically sorts by distance (nearest first) when using $near
        const items = await collection
            .find(query)
            .limit(limit)
            .toArray();

        // Calculate distances and format response
        const itemsWithDistance = items.map((item: any) => {
            const [itemLng, itemLat] = item.location.coordinates;
            const distance = calculateDistance(latitude, longitude, itemLat, itemLng);

            return {
                id: item._id.toString(),
                ...item,
                _id: undefined, // Remove MongoDB _id from response
                distance: Math.round(distance * 10) / 10, // Round to 1 decimal
            };
        });

        return NextResponse.json({
            success: true,
            items: itemsWithDistance,
            count: items.length,
            userLocation: {
                latitude,
                longitude
            },
            searchRadius: radius,
            searchRadiusKm: Math.round(radius / 1000),
            category: category || 'all',
            algorithm: 'mongodb-knn', // Indicate we're using MongoDB's KNN
        });

    } catch (error) {
        console.error('Error fetching nearby cultural items:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch nearby items',
                code: 'INTERNAL_ERROR',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 - Latitude of point 1
 * @param lon1 - Longitude of point 1
 * @param lat2 - Latitude of point 2
 * @param lon2 - Longitude of point 2
 * @returns Distance in kilometers
 */
function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Earth's radius in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

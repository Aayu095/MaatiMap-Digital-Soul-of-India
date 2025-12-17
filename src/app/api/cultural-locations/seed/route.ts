import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { culturalLocationsSeedData } from '@/lib/culturalLocationsSeedData';

/**
 * Seed cultural locations data into Firestore
 * Development only - protected by environment check
 */
export async function POST() {
    // Only allow in development
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json(
            { error: 'This endpoint is only available in development' },
            { status: 403 }
        );
    }

    try {
        const collectionRef = collection(db, 'cultural_locations');

        // Add each location
        const promises = culturalLocationsSeedData.map(async (location) => {
            const docRef = doc(collectionRef, location.id);
            await setDoc(docRef, {
                ...location,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        });

        await Promise.all(promises);

        return NextResponse.json({
            success: true,
            message: `Successfully seeded ${culturalLocationsSeedData.length} cultural locations`,
            count: culturalLocationsSeedData.length,
        });
    } catch (error) {
        console.error('Error seeding cultural locations:', error);
        return NextResponse.json(
            { error: 'Failed to seed cultural locations', details: String(error) },
            { status: 500 }
        );
    }
}

/**
 * Get seed data info (without actually seeding)
 */
export async function GET() {
    return NextResponse.json({
        totalLocations: culturalLocationsSeedData.length,
        breakdown: {
            cities: culturalLocationsSeedData.filter(l => l.type === 'city').length,
            heritageSites: culturalLocationsSeedData.filter(l => l.type === 'heritage-site').length,
            towns: culturalLocationsSeedData.filter(l => l.type === 'town').length,
            villages: culturalLocationsSeedData.filter(l => l.type === 'village').length,
        },
        categories: {
            heritage: culturalLocationsSeedData.filter(l => l.category === 'heritage').length,
            tradition: culturalLocationsSeedData.filter(l => l.category === 'tradition').length,
            art: culturalLocationsSeedData.filter(l => l.category === 'art').length,
            festival: culturalLocationsSeedData.filter(l => l.category === 'festival').length,
            music: culturalLocationsSeedData.filter(l => l.category === 'music').length,
            craft: culturalLocationsSeedData.filter(l => l.category === 'craft').length,
            food: culturalLocationsSeedData.filter(l => l.category === 'food').length,
        },
    });
}

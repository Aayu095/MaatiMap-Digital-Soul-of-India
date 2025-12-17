

"use client";

import dynamic from 'next/dynamic';

// Dynamically import the map component with no SSR
const DynamicIndiaMap = dynamic(
    () => import('@/components/DynamicIndiaMap').then(mod => ({ default: mod.DynamicIndiaMap })),
    { ssr: false }
);

export default function MapPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-2">Interactive Map</h2>
                <p className="text-sm text-gray-400">
                    Explore India's cultural heritage through an interactive map - discover temples, forts, festivals, and traditions across the nation.
                </p>
            </div>

            {/* Map Component */}
            <DynamicIndiaMap />
        </div>
    );
}

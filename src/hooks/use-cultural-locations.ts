import { useQuery } from '@tanstack/react-query';
import type { CulturalLocation } from '@/lib/types';

interface UseCulturalLocationsOptions {
    state?: string;
    category?: string;
    minZoom?: number;
    limit?: number;
}

/**
 * Hook to fetch cultural locations with optional filters
 */
export function useCulturalLocations(options: UseCulturalLocationsOptions = {}) {
    return useQuery({
        queryKey: ['cultural-locations', options],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (options.state) params.append('state', options.state);
            if (options.category) params.append('category', options.category);
            if (options.minZoom !== undefined) params.append('minZoom', options.minZoom.toString());
            if (options.limit) params.append('limit', options.limit.toString());

            const response = await fetch(`/api/cultural-locations?${params.toString()}`);

            if (!response.ok) {
                throw new Error('Failed to fetch cultural locations');
            }

            const data = await response.json();
            return data.locations as CulturalLocation[];
        },
    });
}

/**
 * Hook to fetch cultural locations based on current map zoom level
 */
export function useCulturalLocationsByZoom(zoom: number, category?: string) {
    return useCulturalLocations({
        minZoom: zoom,
        category,
        limit: 200, // Increase limit for map markers
    });
}

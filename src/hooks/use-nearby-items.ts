import { useQuery } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import type { CulturalItem } from '@/lib/types';

interface UseNearbyItemsOptions {
    radius?: number; // in meters (default: 50000 = 50km)
    category?: string; // filter by category
    limit?: number; // max results (default: 20)
    enabled?: boolean; // enable/disable query
}

interface NearbyItemsResponse {
    success: boolean;
    items: (CulturalItem & { distance: number })[];
    count: number;
    userLocation: {
        latitude: number;
        longitude: number;
    };
    searchRadius: number;
    searchRadiusKm: number;
    category: string;
}

interface UserLocation {
    lat: number;
    lng: number;
}

export function useNearbyItems(options: UseNearbyItemsOptions = {}) {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    /**
     * Request user's current location using Geolocation API
     */
    const requestLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            return;
        }

        setIsLoadingLocation(true);
        setLocationError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLocationError(null);
                setIsLoadingLocation(false);
                console.log('✅ Location obtained:', position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                let errorMessage = 'Failed to get your location';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out. Please try again.';
                        break;
                }

                setLocationError(errorMessage);
                setIsLoadingLocation(false);
                console.error('❌ Location error:', error);
            },
            {
                enableHighAccuracy: true, // Use GPS if available
                timeout: 10000, // 10 second timeout
                maximumAge: 300000, // Accept cached location up to 5 minutes old
            }
        );
    }, []);

    /**
     * Fetch nearby cultural items
     */
    const { data, isLoading, error, refetch, isFetching } = useQuery<NearbyItemsResponse>({
        queryKey: ['nearby-items', userLocation, options.radius, options.category, options.limit],
        queryFn: async () => {
            if (!userLocation) {
                throw new Error('User location not available');
            }

            const params = new URLSearchParams({
                lat: userLocation.lat.toString(),
                lng: userLocation.lng.toString(),
                radius: (options.radius || 50000).toString(),
                limit: (options.limit || 20).toString(),
            });

            if (options.category && options.category !== 'all') {
                params.append('category', options.category);
            }

            const response = await fetch(`/api/cultural-items/nearby?${params}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch nearby items');
            }

            return response.json();
        },
        enabled: !!userLocation && (options.enabled !== false),
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        retry: 2, // Retry failed requests twice
    });

    return {
        // Data
        items: data?.items || [],
        count: data?.count || 0,
        searchRadius: data?.searchRadiusKm || (options.radius ? options.radius / 1000 : 50),

        // Location state
        userLocation,
        locationError,
        isLoadingLocation,

        // Query state
        isLoadingItems: isLoading || isFetching,
        error: error ? (error as Error).message : null,

        // Actions
        requestLocation,
        refetch,

        // Helpers
        hasLocation: !!userLocation,
        hasItems: (data?.count || 0) > 0,
    };
}

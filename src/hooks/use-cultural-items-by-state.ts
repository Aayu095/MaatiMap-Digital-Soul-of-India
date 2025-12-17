import { useQuery } from '@tanstack/react-query';
import type { CulturalItem } from '@/lib/types';

interface UseCulturalItemsByStateOptions {
    state: string;
    category?: string;
    enabled?: boolean;
}

/**
 * Hook to fetch cultural items for a specific state
 */
export function useCulturalItemsByState(options: UseCulturalItemsByStateOptions) {
    const { state, category, enabled = true } = options;

    return useQuery({
        queryKey: ['cultural-items', state, category],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('state', state);
            if (category) {
                params.append('category', category);
            }

            const response = await fetch(`/api/cultural-items?${params.toString()}`);

            if (!response.ok) {
                throw new Error('Failed to fetch cultural items');
            }

            const data = await response.json();
            return data.items as CulturalItem[];
        },
        enabled: enabled && !!state,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

/**
 * Hook to fetch all cultural items
 */
export function useCulturalItems(limit: number = 100) {
    return useQuery({
        queryKey: ['cultural-items', 'all', limit],
        queryFn: async () => {
            const response = await fetch(`/api/cultural-items?limit=${limit}`);

            if (!response.ok) {
                throw new Error('Failed to fetch cultural items');
            }

            const data = await response.json();
            return data.items as CulturalItem[];
        },
        staleTime: 10 * 60 * 1000,
    });
}

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Event, EventCategory, EventStatus } from '@/lib/types';

interface EventsResponse {
    success: boolean;
    count: number;
    events: Event[];
}

interface EventResponse {
    success: boolean;
    event: Event;
}

interface UseEventsOptions {
    status?: EventStatus;
    category?: EventCategory;
    region?: string;
    state?: string;
    limit?: number;
    featured?: boolean;
    enabled?: boolean;
}

/**
 * Fetch all events with optional filters
 */
export function useEvents(options: UseEventsOptions = {}): UseQueryResult<Event[], Error> {
    const { status, category, region, state, limit, featured, enabled = true } = options;

    return useQuery({
        queryKey: ['events', { status, category, region, state, limit, featured }],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (status) params.append('status', status);
            if (category) params.append('category', category);
            if (region) params.append('region', region);
            if (state) params.append('state', state);
            if (limit) params.append('limit', limit.toString());
            if (featured) params.append('featured', 'true');

            const response = await fetch(`/api/events?${params.toString()}`);

            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }

            const data: EventsResponse = await response.json();
            return data.events;
        },
        enabled,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    });
}

/**
 * Fetch upcoming events (convenience hook)
 */
export function useUpcomingEvents(limit: number = 10): UseQueryResult<Event[], Error> {
    return useEvents({
        status: 'upcoming',
        limit,
    });
}

/**
 * Fetch featured upcoming events for homepage
 */
export function useFeaturedEvents(limit: number = 3): UseQueryResult<Event[], Error> {
    return useEvents({
        status: 'upcoming',
        featured: true,
        limit,
    });
}

/**
 * Fetch ongoing events
 */
export function useOngoingEvents(limit: number = 10): UseQueryResult<Event[], Error> {
    return useEvents({
        status: 'ongoing',
        limit,
    });
}

/**
 * Fetch single event by ID
 */
export function useEventById(id: string | null): UseQueryResult<Event, Error> {
    return useQuery({
        queryKey: ['event', id],
        queryFn: async () => {
            if (!id) throw new Error('Event ID is required');

            const response = await fetch(`/api/events/${id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch event');
            }

            const data: EventResponse = await response.json();
            return data.event;
        },
        enabled: !!id,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
    });
}

/**
 * Fetch events by category
 */
export function useEventsByCategory(category: EventCategory, limit: number = 20): UseQueryResult<Event[], Error> {
    return useEvents({
        category,
        status: 'upcoming',
        limit,
    });
}

/**
 * Fetch events by state
 */
export function useEventsByState(state: string, limit: number = 20): UseQueryResult<Event[], Error> {
    return useEvents({
        state,
        status: 'upcoming',
        limit,
    });
}

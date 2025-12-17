import React from 'react';
import { EventCard } from './EventCard';
import type { Event } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface EventsListProps {
    events: Event[];
    isLoading?: boolean;
    onEventClick?: (event: Event) => void;
    emptyMessage?: string;
    className?: string;
}

export function EventsList({
    events,
    isLoading = false,
    onEventClick,
    emptyMessage = 'No events found',
    className = ''
}: EventsListProps) {

    // Loading State
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground font-body">Loading events...</p>
                </div>
            </div>
        );
    }

    // Empty State
    if (!events || events.length === 0) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center space-y-4">
                    <div className="text-6xl">🎭</div>
                    <p className="text-lg text-muted-foreground font-body">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    // Events Grid
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick?.(event)}
                />
            ))}
        </div>
    );
}

"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import type { Event } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';

interface EventsFeedProps {
    events: Event[];
    onEventClick?: (event: Event) => void;
    selectedDate?: Date | null;
}

export function EventsFeed({ events, onEventClick, selectedDate }: EventsFeedProps) {
    // Format date for display
    const formatDate = (date: Date | Timestamp) => {
        const d = date instanceof Timestamp ? date.toDate() : date instanceof Date ? date : new Date(date);
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Format date range
    const formatDateRange = (startDate: Date | Timestamp, endDate?: Date | Timestamp) => {
        const start = startDate instanceof Timestamp ? startDate.toDate() : startDate instanceof Date ? startDate : new Date(startDate);

        if (!endDate) {
            return formatDate(start);
        }

        const end = endDate instanceof Timestamp ? endDate.toDate() : endDate instanceof Date ? endDate : new Date(endDate);

        // Same day
        if (start.toDateString() === end.toDateString()) {
            return formatDate(start);
        }

        // Same month
        if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
            return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.getDate()}, ${end.getFullYear()}`;
        }

        // Different months
        return `${formatDate(start)} - ${formatDate(end)}`;
    };

    // Get category color
    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Festival': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
            'Music': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
            'Dance': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
            'Art': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
            'Food': 'bg-green-500/10 text-green-500 border-green-500/20',
            'Religious': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        };
        return colors[category] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    };

    // Filter events by selected date if provided
    const displayEvents = selectedDate
        ? events.filter(event => {
            const eventDate = event.startDate instanceof Timestamp
                ? event.startDate.toDate()
                : event.startDate instanceof Date
                    ? event.startDate
                    : new Date(event.startDate);

            return (
                eventDate.getDate() === selectedDate.getDate() &&
                eventDate.getMonth() === selectedDate.getMonth() &&
                eventDate.getFullYear() === selectedDate.getFullYear()
            );
        })
        : events;

    if (displayEvents.length === 0) {
        return (
            <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Events Found</h3>
                <p className="text-sm text-muted-foreground">
                    {selectedDate
                        ? `No events scheduled for ${formatDate(selectedDate)}`
                        : 'No upcoming events at this time'}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold font-headline">
                    {selectedDate ? `Events on ${formatDate(selectedDate)}` : 'Upcoming Events'}
                </h3>
                <span className="text-sm text-muted-foreground">
                    {displayEvents.length} {displayEvents.length === 1 ? 'event' : 'events'}
                </span>
            </div>

            {/* Events List */}
            <div className="space-y-3">
                {displayEvents.map((event) => (
                    <Card
                        key={event.id}
                        className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group border-border/50"
                        onClick={() => onEventClick?.(event)}
                    >
                        <CardContent className="p-4">
                            <div className="flex gap-4">
                                {/* Event Image */}
                                {event.imageUrl && (
                                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted">
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                                        />
                                    </div>
                                )}

                                {/* Event Details */}
                                <div className="flex-1 min-w-0">
                                    {/* Category Badge */}
                                    <Badge
                                        variant="outline"
                                        className={`mb-2 text-xs ${getCategoryColor(event.category)}`}
                                    >
                                        {event.category}
                                    </Badge>

                                    {/* Title */}
                                    <h4 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                        {event.title}
                                    </h4>

                                    {/* Date */}
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{formatDateRange(event.startDate, event.endDate)}</span>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <MapPin className="h-3 w-3" />
                                        <span className="line-clamp-1">
                                            {event.city ? `${event.city}, ${event.state}` : event.state}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

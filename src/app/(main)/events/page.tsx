"use client";

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { EventsCalendar } from '@/components/events/EventsCalendar';
import { EventsFeed } from '@/components/events/EventsFeed';
import { EventFilters, FilterState } from '@/components/events/EventFilters';
import { EventDetailModal } from '@/components/events/EventDetailModal';
import { useUpcomingEvents } from '@/hooks/use-events';
import type { Event } from '@/lib/types';

export default function EventsPage() {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [filters, setFilters] = useState<FilterState>({});

    // Fetch upcoming events
    const { data: events = [], isLoading } = useUpcomingEvents(100);

    // Apply client-side filters
    const filteredEvents = events.filter((event) => {
        if (filters.category && event.category !== filters.category) {
            return false;
        }
        if (filters.state && event.state !== filters.state) {
            return false;
        }
        if (filters.month) {
            const eventDate = event.startDate instanceof Date
                ? event.startDate
                : event.startDate.toDate ? event.startDate.toDate() : new Date(event.startDate);
            const eventMonth = eventDate.toLocaleDateString('en-US', { month: 'long' });
            if (eventMonth !== filters.month) {
                return false;
            }
        }
        return true;
    });

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section - Feed Style */}
            <section className="py-12 md:py-16 border-b border-border">
                <div className="container max-w-6xl mx-auto px-4 md:px-6">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Calendar className="h-7 w-7 text-primary" />
                            <h1 className="text-3xl md:text-4xl font-bold font-headline">
                                Upcoming Events
                            </h1>
                        </div>
                        <p className="text-sm text-muted-foreground font-body max-w-2xl mx-auto">
                            Discover and celebrate India's rich cultural heritage through festivals, rituals, music, dance, and more.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content - Two Column Layout */}
            <section className="py-12 md:py-16">
                <div className="container max-w-6xl mx-auto px-4 md:px-6">
                    {/* Filters */}
                    <div className="mb-8">
                        <EventFilters onFilterChange={setFilters} />
                    </div>

                    {/* Two Column Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Left Column - Calendar (60%) */}
                        <div className="lg:col-span-3">
                            <div className="lg:sticky lg:top-24">
                                <EventsCalendar
                                    events={filteredEvents}
                                    onDateSelect={handleDateSelect}
                                    selectedDate={selectedDate}
                                />
                            </div>
                        </div>

                        {/* Right Column - Events Feed (40%) */}
                        <div className="lg:col-span-2">
                            {isLoading ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                                    <p className="text-sm text-muted-foreground mt-4">Loading events...</p>
                                </div>
                            ) : (
                                <EventsFeed
                                    events={filteredEvents}
                                    onEventClick={handleEventClick}
                                    selectedDate={selectedDate}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Event Detail Modal */}
            <EventDetailModal
                event={selectedEvent}
                isOpen={!!selectedEvent}
                onClose={handleCloseModal}
            />
        </div>
    );
}

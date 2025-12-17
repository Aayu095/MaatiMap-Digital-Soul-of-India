"use client";

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Event } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';

interface EventsCalendarProps {
    events: Event[];
    onDateSelect?: (date: Date) => void;
    selectedDate?: Date | null;
}

export function EventsCalendar({ events, onDateSelect, selectedDate }: EventsCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Get calendar data for current month
    const calendarData = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        // First day of the month
        const firstDay = new Date(year, month, 1);
        const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        // Create array of dates
        const dates: (Date | null)[] = [];

        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            dates.push(null);
        }

        // Add all days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            dates.push(new Date(year, month, day));
        }

        return dates;
    }, [currentMonth]);

    // Get events for a specific date
    const getEventsForDate = (date: Date) => {
        return events.filter(event => {
            const eventDate = event.startDate instanceof Timestamp
                ? event.startDate.toDate()
                : event.startDate instanceof Date
                    ? event.startDate
                    : new Date(event.startDate);

            return (
                eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear()
            );
        });
    };

    // Navigation handlers
    const goToPreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const goToToday = () => {
        setCurrentMonth(new Date());
    };

    const handleYearChange = (year: number) => {
        setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    };

    const handleMonthSelect = (monthIndex: number) => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    };

    // Check if date is today
    const isToday = (date: Date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    // Check if date is selected
    const isSelected = (date: Date) => {
        if (!selectedDate) return false;
        return (
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()
        );
    };

    const currentYear = currentMonth.getFullYear();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Generate year options (current year ± 5 years)
    const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

    return (
        <div className="bg-card border border-border rounded-lg p-4 md:p-6">
            {/* Header with Month/Year Selectors */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                {/* Month and Year Dropdowns */}
                <div className="flex items-center gap-2">
                    <select
                        value={currentMonth.getMonth()}
                        onChange={(e) => handleMonthSelect(parseInt(e.target.value))}
                        className="bg-background border border-border rounded-md px-3 py-1.5 text-sm font-semibold cursor-pointer hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {months.map((month, index) => (
                            <option key={month} value={index}>
                                {month}
                            </option>
                        ))}
                    </select>

                    <select
                        value={currentYear}
                        onChange={(e) => handleYearChange(parseInt(e.target.value))}
                        className="bg-background border border-border rounded-md px-3 py-1.5 text-sm font-semibold cursor-pointer hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {yearOptions.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={goToToday}
                        className="text-xs"
                    >
                        Today
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToPreviousMonth}
                        className="h-8 w-8"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToNextMonth}
                        className="h-8 w-8"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
                {/* Week day headers */}
                {weekDays.map(day => (
                    <div
                        key={day}
                        className="text-center text-xs font-medium text-muted-foreground py-2"
                    >
                        {day}
                    </div>
                ))}

                {/* Date cells */}
                {calendarData.map((date, index) => {
                    if (!date) {
                        return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const dayEvents = getEventsForDate(date);
                    const hasEvents = dayEvents.length > 0;
                    const isTodayDate = isToday(date);
                    const isSelectedDate = isSelected(date);

                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => onDateSelect?.(date)}
                            className={`
                aspect-square p-1 rounded-lg text-sm font-medium
                transition-all duration-200
                hover:bg-accent hover:scale-105
                ${isTodayDate ? 'bg-primary/10 text-primary font-bold' : ''}
                ${isSelectedDate ? 'bg-primary text-primary-foreground' : ''}
                ${!isTodayDate && !isSelectedDate ? 'text-foreground' : ''}
                relative
              `}
                        >
                            <span className="block">{date.getDate()}</span>
                            {hasEvents && (
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                                    {dayEvents.slice(0, 3).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1 w-1 rounded-full ${isSelectedDate ? 'bg-primary-foreground' : 'bg-primary'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span>Has Events</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-primary/10 border border-primary" />
                        <span>Today</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

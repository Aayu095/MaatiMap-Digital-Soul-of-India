import type { Event, EventStatus } from './types';
import { Timestamp } from 'firebase/firestore';

/**
 * Get the status of an event based on current date
 */
export function getEventStatus(event: Event): EventStatus {
    const now = new Date();
    const startDate = event.startDate instanceof Timestamp
        ? event.startDate.toDate()
        : new Date(event.startDate);
    const endDate = event.endDate instanceof Timestamp
        ? event.endDate.toDate()
        : new Date(event.endDate);

    if (now < startDate) {
        return 'upcoming';
    } else if (now >= startDate && now <= endDate) {
        return 'ongoing';
    } else {
        return 'past';
    }
}

/**
 * Format event date range for display
 */
export function formatEventDate(startDate: Date | Timestamp, endDate: Date | Timestamp): string {
    const start = startDate instanceof Timestamp ? startDate.toDate() : new Date(startDate);
    const end = endDate instanceof Timestamp ? endDate.toDate() : new Date(endDate);

    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const startDay = start.getDate();
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    const endDay = end.getDate();
    const year = start.getFullYear();

    // Same day
    if (start.toDateString() === end.toDateString()) {
        return `${startMonth} ${startDay}, ${year}`;
    }

    // Same month
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    }

    // Different months
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}

/**
 * Get time until event starts (for countdown)
 */
export function getTimeUntilEvent(startDate: Date | Timestamp): string {
    const start = startDate instanceof Timestamp ? startDate.toDate() : new Date(startDate);
    const now = new Date();
    const diffMs = start.getTime() - now.getTime();

    if (diffMs < 0) {
        return 'Event started';
    }

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffDays > 30) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? 's' : ''} away`;
    } else if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} away`;
    } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} away`;
    } else {
        return 'Starting soon!';
    }
}

/**
 * Filter events to show only upcoming ones
 */
export function filterUpcomingEvents(events: Event[]): Event[] {
    return events.filter(event => getEventStatus(event) === 'upcoming');
}

/**
 * Filter events to show only ongoing ones
 */
export function filterOngoingEvents(events: Event[]): Event[] {
    return events.filter(event => getEventStatus(event) === 'ongoing');
}

/**
 * Sort events by start date (earliest first)
 */
export function sortEventsByDate(events: Event[]): Event[] {
    return [...events].sort((a, b) => {
        const dateA = a.startDate instanceof Timestamp ? a.startDate.toDate() : new Date(a.startDate);
        const dateB = b.startDate instanceof Timestamp ? b.startDate.toDate() : new Date(b.startDate);
        return dateA.getTime() - dateB.getTime();
    });
}

/**
 * Generate ICS file content for "Add to Calendar"
 */
export function generateICSFile(event: Event): string {
    const start = event.startDate instanceof Timestamp
        ? event.startDate.toDate()
        : new Date(event.startDate);
    const end = event.endDate instanceof Timestamp
        ? event.endDate.toDate()
        : new Date(event.endDate);

    // Format dates for ICS (YYYYMMDDTHHMMSS)
    const formatICSDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const location = event.city ? `${event.city}, ${event.state}` : event.state;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MaatiMap//Event Calendar//EN
BEGIN:VEVENT
UID:${event.id}@maatimap.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${event.title}
DESCRIPTION:${event.summary.replace(/\n/g, '\\n')}
LOCATION:${location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    return icsContent;
}

/**
 * Download ICS file
 */
export function downloadICSFile(event: Event): void {
    const icsContent = generateICSFile(event);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.title.replace(/\s+/g, '-').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

/**
 * Get month name from date
 */
export function getMonthName(date: Date | Timestamp): string {
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', { month: 'long' });
}

/**
 * Check if event is within next N days
 */
export function isEventSoon(event: Event, days: number = 30): boolean {
    const start = event.startDate instanceof Timestamp
        ? event.startDate.toDate()
        : new Date(event.startDate);
    const now = new Date();
    const diffMs = start.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return diffDays >= 0 && diffDays <= days;
}

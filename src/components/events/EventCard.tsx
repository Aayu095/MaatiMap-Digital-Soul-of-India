import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Event } from '@/lib/types';
import { formatEventDate, getTimeUntilEvent, isEventSoon } from '@/lib/eventUtils';

interface EventCardProps {
    event: Event;
    onClick?: () => void;
    className?: string;
}

const categoryColors: Record<string, string> = {
    festivals: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    rituals: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    music: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    dance: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    food: 'bg-green-500/10 text-green-500 border-green-500/20',
    heritage: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    cultural: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
};

export function EventCard({ event, onClick, className = '' }: EventCardProps) {
    const showCountdown = isEventSoon(event, 30);
    const timeUntil = getTimeUntilEvent(event.startDate);
    const formattedDate = formatEventDate(event.startDate, event.endDate);

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <Card
            className={`group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border-border/50 ${className}`}
            onClick={handleClick}
        >
            {/* Image Section */}
            <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    data-ai-hint={event.imageHint}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                    <Badge
                        variant="outline"
                        className={`${categoryColors[event.category]} backdrop-blur-sm font-semibold`}
                    >
                        {event.category}
                    </Badge>
                </div>

                {/* Featured Badge */}
                {event.featured && (
                    <div className="absolute top-3 left-3">
                        <Badge variant="default" className="bg-primary/90 backdrop-blur-sm">
                            Featured
                        </Badge>
                    </div>
                )}

                {/* Countdown Timer (if event is soon) */}
                {showCountdown && (
                    <div className="absolute bottom-3 left-3">
                        <div className="bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 text-primary-foreground" />
                            <span className="text-xs font-semibold text-primary-foreground">
                                {timeUntil}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <CardContent className="p-5">
                <h3 className="text-lg font-headline font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {event.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-body">
                    {event.summary}
                </p>

                {/* Event Details */}
                <div className="space-y-2">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">{formattedDate}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.city ? `${event.city}, ${event.state}` : event.state}</span>
                    </div>
                </div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                        {event.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs px-2 py-0.5"
                            >
                                {tag}
                            </Badge>
                        ))}
                        {event.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                +{event.tags.length - 3}
                            </Badge>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

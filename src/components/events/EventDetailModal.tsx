import React from 'react';
import { X, Calendar, MapPin, Tag, Download, Share2, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Event } from '@/lib/types';
import { formatEventDate, downloadICSFile } from '@/lib/eventUtils';

interface EventDetailModalProps {
    event: Event | null;
    isOpen: boolean;
    onClose: () => void;
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

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
    if (!event) return null;

    const formattedDate = formatEventDate(event.startDate, event.endDate);

    const handleAddToCalendar = () => {
        downloadICSFile(event);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: event.title,
                    text: event.summary,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const handleViewOnMap = () => {
        if (event.latitude && event.longitude) {
            window.open(`/map?lat=${event.latitude}&lng=${event.longitude}`, '_blank');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
                {/* Hero Image */}
                <div className="relative w-full h-64 md:h-80">
                    <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                        data-ai-hint={event.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                        <Badge
                            variant="outline"
                            className={`${categoryColors[event.category]} backdrop-blur-sm font-semibold text-sm`}
                        >
                            {event.category}
                        </Badge>
                    </div>

                    {/* Featured Badge */}
                    {event.featured && (
                        <div className="absolute top-4 left-4">
                            <Badge variant="default" className="bg-primary/90 backdrop-blur-sm">
                                Featured Event
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {/* Header */}
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-3xl font-headline font-bold mb-2">
                            {event.title}
                        </DialogTitle>
                        <DialogDescription className="text-base text-muted-foreground font-body">
                            {event.summary}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Quick Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-foreground">Date</p>
                                <p className="text-sm text-muted-foreground">{formattedDate}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-foreground">Location</p>
                                <p className="text-sm text-muted-foreground">
                                    {event.city ? `${event.city}, ${event.state}` : event.state}
                                </p>
                                <p className="text-xs text-muted-foreground">{event.region}</p>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 font-headline">About This Event</h3>
                        <p className="text-muted-foreground leading-relaxed font-body whitespace-pre-line">
                            {event.description}
                        </p>
                    </div>

                    {/* Significance */}
                    {event.significance && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3 font-headline">Cultural Significance</h3>
                            <p className="text-muted-foreground leading-relaxed font-body">
                                {event.significance}
                            </p>
                        </div>
                    )}

                    {/* Tags */}
                    {event.tags && event.tags.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Tag className="h-4 w-4 text-primary" />
                                <h3 className="text-sm font-semibold font-headline">Tags</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {event.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    <Separator className="my-6" />

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <Button onClick={handleAddToCalendar} className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Add to Calendar
                        </Button>

                        <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
                            <Share2 className="h-4 w-4" />
                            Share Event
                        </Button>

                        {event.latitude && event.longitude && (
                            <Button onClick={handleViewOnMap} variant="outline" className="flex items-center gap-2">
                                <ExternalLink className="h-4 w-4" />
                                View on Map
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

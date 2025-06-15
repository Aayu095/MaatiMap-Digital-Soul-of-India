"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass } from 'lucide-react';
import CulturalItemCard from '@/components/cultural-item-card';
import { SAMPLE_CULTURAL_ITEMS } from '@/constants'; // Using sample data for placeholder

export default function NearbyPage() {
  // Placeholder: simulate nearby items by taking a few from sample data
  const nearbyItems = SAMPLE_CULTURAL_ITEMS.slice(0, 3);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-2 font-headline">Culture Near You</h1>
      <p className="text-center text-muted-foreground mb-8 font-body text-sm">
        Discover festivals, foods, and art centers in your vicinity.
      </p>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center font-headline text-lg">
            <Compass className="h-5 w-5 mr-2 text-primary" />
            Location Services
          </CardTitle>
          <CardDescription className="font-body text-xs">
            This feature will use Geoapify to find cultural spots near your current location.
            Geoapify integration is pending.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button disabled className="w-full md:w-auto text-sm">
            <Compass className="mr-2 h-4 w-4" /> Get My Location (Feature Coming Soon)
          </Button>
          <p className="text-xs text-muted-foreground mt-2 font-body">
            We respect your privacy. Location is used only to find nearby cultural points.
          </p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-6 mt-10 font-headline">Nearby Highlights (Sample Data)</h2>
      {nearbyItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {nearbyItems.map(item => (
            <CulturalItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground font-body text-sm">No nearby items to display with sample data.</p>
      )}
    </div>
  );
}

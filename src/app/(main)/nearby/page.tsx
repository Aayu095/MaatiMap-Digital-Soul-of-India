'use client';

import { useState } from 'react';
import { MapPin, Loader2, AlertCircle, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNearbyItems } from '@/hooks/use-nearby-items';
import CulturalItemCard from '@/components/cultural-item-card';

export default function NearbyPage() {
  const [radius, setRadius] = useState(50000); // 50km default
  const [category, setCategory] = useState<string>('all');

  const {
    items,
    count,
    searchRadius,
    userLocation,
    locationError,
    isLoadingLocation,
    isLoadingItems,
    requestLocation,
    hasLocation,
    hasItems,
  } = useNearbyItems({ radius, category });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="h-7 w-7 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold font-headline">
                Nearby Culture
              </h1>
            </div>
            <p className="text-sm text-muted-foreground font-body max-w-2xl mx-auto">
              Discover cultural heritage near you. Share your location to find temples, festivals, art, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">

          {/* Location Request */}
          {!hasLocation && (
            <div className="max-w-md mx-auto">
              <Card className="p-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
                  <Navigation className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold mb-2 font-headline">Share Your Location</h2>
                <p className="text-sm text-muted-foreground mb-6 font-body">
                  We need your location to show cultural items near you. Your location is only used for this search and is not stored.
                </p>
                <Button
                  onClick={requestLocation}
                  disabled={isLoadingLocation}
                  className="w-full"
                  size="lg"
                >
                  {isLoadingLocation ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Getting Location...
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 mr-2" />
                      Allow Location Access
                    </>
                  )}
                </Button>

                {locationError && (
                  <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-destructive text-left">{locationError}</p>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground font-body">
                    <strong>Privacy:</strong> We respect your privacy. Your location is used only to find nearby cultural items and is not stored or shared.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Filters and Results */}
          {hasLocation && (
            <>
              {/* Location Info */}
              <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      Searching near: {userLocation?.lat.toFixed(4)}, {userLocation?.lng.toFixed(4)}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={requestLocation}
                    disabled={isLoadingLocation}
                  >
                    {isLoadingLocation ? (
                      <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />
                    ) : (
                      <Navigation className="h-3 w-3 mr-1.5" />
                    )}
                    Update Location
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="mb-8 flex flex-wrap gap-4">
                {/* Radius Filter */}
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm font-medium mb-2 block">Search Radius</label>
                  <select
                    value={radius}
                    onChange={(e) => setRadius(parseInt(e.target.value))}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="10000">Within 10 km</option>
                    <option value="25000">Within 25 km</option>
                    <option value="50000">Within 50 km</option>
                    <option value="100000">Within 100 km</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Categories</option>
                    <option value="heritage-sites">Heritage Sites</option>
                    <option value="festivals">Festivals</option>
                    <option value="art">Art & Craft</option>
                    <option value="food">Food</option>
                    <option value="music">Music & Dance</option>
                    <option value="rituals">Rituals</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              {isLoadingItems ? (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">Finding nearby culture...</p>
                </div>
              ) : !hasItems ? (
                <Card className="p-12 text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No cultural items found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    No cultural items found within {searchRadius}km of your location.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setRadius(radius * 2)}
                    disabled={radius >= 100000}
                  >
                    Expand Search Radius
                  </Button>
                </Card>
              ) : (
                <>
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Found <strong>{count}</strong> cultural {count === 1 ? 'item' : 'items'} within <strong>{searchRadius}km</strong>
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <CulturalItemCard
                        key={item.id}
                        item={item}
                        showDistance={true}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

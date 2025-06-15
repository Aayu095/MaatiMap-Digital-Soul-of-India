"use client";

import { useState, useMemo } from 'react';
import CulturalItemCard from '@/components/cultural-item-card';
import { SAMPLE_CULTURAL_ITEMS, CULTURAL_CATEGORIES } from '@/constants';
import type { CulturalCategorySlug } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

// Get unique regions for filter
const uniqueRegions = Array.from(new Set(SAMPLE_CULTURAL_ITEMS.map(item => item.region))).sort();

export default function FeedPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedArtform, setSelectedArtform] = useState<CulturalCategorySlug | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = useMemo(() => {
    return SAMPLE_CULTURAL_ITEMS.filter(item => {
      const matchesRegion = selectedRegion === 'all' || item.region === selectedRegion;
      const matchesArtform = selectedArtform === 'all' || item.category === selectedArtform;
      const matchesSearch = searchTerm === '' || 
                            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesRegion && matchesArtform && matchesSearch;
    }).sort(() => 0.5 - Math.random()); // Simulate "recently added" by randomizing
  }, [selectedRegion, selectedArtform, searchTerm]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-2 font-headline">Community Feed</h1>
      <p className="text-center text-muted-foreground mb-8 font-body text-sm">
        See what's new and trending in India's cultural landscape.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 border rounded-lg shadow">
        <div>
          <label htmlFor="search-feed" className="block text-xs font-medium text-foreground mb-1">Search</label>
          <Input 
            id="search-feed"
            type="text" 
            placeholder="Search by name, tag, etc." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm"
          />
        </div>
        <div>
          <label htmlFor="region-filter" className="block text-xs font-medium text-foreground mb-1">Region</label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger id="region-filter" className="w-full text-sm">
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-sm">All Regions</SelectItem>
              {uniqueRegions.map(region => (
                <SelectItem key={region} value={region} className="text-sm">{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="artform-filter" className="block text-xs font-medium text-foreground mb-1">Category</label>
          <Select value={selectedArtform} onValueChange={(value) => setSelectedArtform(value as CulturalCategorySlug | 'all')}>
            <SelectTrigger id="artform-filter" className="w-full text-sm">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-sm">All Categories</SelectItem>
              {CULTURAL_CATEGORIES.map(category => (
                <SelectItem key={category.slug} value={category.slug} className="text-sm">{category.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <CulturalItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-8 font-body text-sm">No items match your filters. Try broadening your search!</p>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from 'react';
import CulturalItemCard from '@/components/cultural-item-card';
import { SAMPLE_CULTURAL_ITEMS, CULTURAL_CATEGORIES } from '@/constants';
import type { CulturalCategorySlug } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const uniqueRegions = Array.from(new Set(SAMPLE_CULTURAL_ITEMS.map(item => item.region))).sort();

export default function FeedPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedArtform, setSelectedArtform] = useState<CulturalCategorySlug | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [shuffledItems, setShuffledItems] = useState<typeof SAMPLE_CULTURAL_ITEMS>([]);

  useEffect(() => {
    const filtered = SAMPLE_CULTURAL_ITEMS.filter(item => {
      const matchesRegion = selectedRegion === 'all' || item.region === selectedRegion;
      const matchesArtform = selectedArtform === 'all' || item.category === selectedArtform;
      const matchesSearch =
        searchTerm === '' ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesRegion && matchesArtform && matchesSearch;
    });

    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setShuffledItems(shuffled);
  }, [selectedRegion, selectedArtform, searchTerm]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">Community Feed</h2>
        <p className="text-sm text-gray-400">See what's new and trending in India's cultural landscape.</p>
      </div>

      {/* Share Section */}
      <div className="bg-[#2A2A2D] border border-[#3A3A3E] rounded-2xl p-6 md:p-8 shadow-md mb-12">
        <h3 className="text-xl font-semibold text-[#E5D5A4] mb-2 text-center">Share Your Culture</h3>
        <p className="text-sm text-gray-300 mb-6 text-center">
          Contribute to the community by sharing a cultural tradition, story, festival, or artwork from your region.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Title or name of cultural item"
            className="bg-black text-white border border-[#E5D5A4] px-4 py-2 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Your region (e.g. Kerala, Rajasthan)"
            className="bg-black text-white border border-[#E5D5A4] px-4 py-2 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Short story or description"
            className="bg-black text-white border border-[#E5D5A4] px-4 py-2 rounded-md text-sm"
          />
        </div>

        <div className="text-center">
          <button
            className="bg-[#A79B84] text-black px-6 py-2 rounded-md text-sm cursor-not-allowed opacity-70"
            disabled
          >
            Upload (Coming Soon)
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div>
          <label htmlFor="search-feed" className="block text-xs font-medium text-white mb-1">Search</label>
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
          <label htmlFor="region-filter" className="block text-xs font-medium text-white mb-1">Region</label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger id="region-filter" className="w-full text-sm">
              <SelectValue placeholder="All Regions" />
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
          <label htmlFor="artform-filter" className="block text-xs font-medium text-white mb-1">Category</label>
          <Select value={selectedArtform} onValueChange={(value) => setSelectedArtform(value as CulturalCategorySlug | 'all')}>
            <SelectTrigger id="artform-filter" className="w-full text-sm">
              <SelectValue placeholder="All Categories" />
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

      {/* Display Cultural Items */}
      {shuffledItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shuffledItems.map(item => (
            <CulturalItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-8 text-sm">
          No items match your filters. Try broadening your search!
        </p>
      )}
    </div>
  );
}

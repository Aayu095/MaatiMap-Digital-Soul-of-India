'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CULTURAL_CATEGORIES } from '@/constants';
import CulturalItemCard from '@/components/cultural-item-card';

export default function DiscoverPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch MongoDB data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/get-cultures');
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update category when query param changes
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setSelectedCategory(cat);
  }, [searchParams]);

  // Update URL when user clicks a tab
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    router.push(`/discover?category=${category}`);
  };

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter(
          (item) =>
            item.category?.toLowerCase().replace(/\s/g, '') ===
            selectedCategory.toLowerCase().replace(/\s/g, '')
        );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-6 font-headline">
        Discover India&apos;s Culture
      </h1>

      <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
        <TabsList className="flex flex-wrap justify-center gap-2 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          {CULTURAL_CATEGORIES.map((c) => (
            <TabsTrigger key={c.slug} value={c.slug}>
              {c.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory}>
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">No cultural items found in this category.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <CulturalItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

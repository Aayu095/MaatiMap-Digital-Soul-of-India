'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, StarOff } from 'lucide-react';

import type { CulturalItem } from '@/lib/types';
import { CULTURAL_CATEGORIES } from '@/constants';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { useEffect, useState } from 'react';

interface CulturalItemCardProps {
  item: CulturalItem;
}

export default function CulturalItemCard({ item }: CulturalItemCardProps) {
  const { user, bookmarkedIds, toggleBookmark, hydrated } = useBookmarks();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const itemDetailLink = `/discover/${item.category}/${item.id}`;
  const categoryInfo = CULTURAL_CATEGORIES.find(cat => cat.slug === item.category);

  useEffect(() => {
    if (item?.id) {
      setIsBookmarked(bookmarkedIds.includes(item.id));
    }
  }, [bookmarkedIds, item?.id, item]);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!hydrated || !item || !item.id) {
      console.warn("⚠️ Bookmark toggle skipped — not hydrated or missing ID", { hydrated, item });
      return;
    }
    toggleBookmark(item.id);
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <Link href={itemDetailLink} className="block">
        <CardHeader className="p-0">
          <div className="relative w-full h-40">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              data-ai-hint={item.imageHint || item.title?.toLowerCase() || 'culture'}
            />
          </div>
        </CardHeader>
      </Link>

      <CardContent className="p-3 flex-grow">
        <Link href={itemDetailLink} className="block">
          <CardTitle className="text-base font-headline mb-1.5 hover:text-primary transition-colors">
            {item.title}
          </CardTitle>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-1.5 font-body">
            {item.summary}
          </p>
        </Link>
        {categoryInfo && (
          <Badge variant="secondary" className="text-[10px] mb-1.5 px-1.5 py-0.5">
            {categoryInfo.name}
          </Badge>
        )}
        <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
          {item.region}
        </Badge>
      </CardContent>

      <CardFooter className="p-3 pt-0">
        {hydrated && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmarkToggle}
            className="w-full justify-start text-muted-foreground hover:text-primary text-xs"
          >
            {isBookmarked ? (
              <>
                <Star className="h-3.5 w-3.5 mr-1.5 fill-primary text-primary" />
                Bookmarked
              </>
            ) : (
              <>
                <StarOff className="h-3.5 w-3.5 mr-1.5" />
                Bookmark
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

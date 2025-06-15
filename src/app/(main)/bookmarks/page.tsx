'use client';

import CulturalItemCard from '@/components/cultural-item-card';
import { BookHeart } from 'lucide-react';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { useEffect, useState } from 'react';
import type { CulturalItem } from '@/lib/types';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function BookmarksPage() {
  const { user, bookmarkedIds, hydrated } = useBookmarks();
  const [bookmarkedItems, setBookmarkedItems] = useState<CulturalItem[]>([]);

  useEffect(() => {
    const fetchBookmarkedItems = async () => {
      if (hydrated && user) {
        if (bookmarkedIds.length > 0) {
          const culturesCollection = collection(db, 'cultures');
          const q = query(culturesCollection, where('id', 'in', bookmarkedIds));
          const querySnapshot = await getDocs(q);
          const items = querySnapshot.docs.map(doc => ({
            id: doc.data().id,
            name: doc.data().name,
            summary: doc.data().summary,
            imageUrl: doc.data().imageUrl,
            category: doc.data().category,
            region: doc.data().region,
            tags: doc.data().tags,
            ...doc.data(),
          })) as CulturalItem[];
          setBookmarkedItems(items);
        } else {
          setBookmarkedItems([]);
        }
      }
    };

    fetchBookmarkedItems();
  }, [user, hydrated, bookmarkedIds]);

  if (!hydrated) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <BookHeart className="h-10 w-10 mx-auto text-primary mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold mb-2 font-headline">Loading Your Saved Culture...</h1>
        <p className="text-muted-foreground font-body text-sm">Please wait a moment.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <BookHeart className="h-10 w-10 mx-auto text-primary mb-4" />
        <h1 className="text-2xl font-bold mb-2 font-headline">My Saved Culture</h1>
        <p className="text-muted-foreground font-body text-sm">
          Your collection of favorite cultural items. You have {bookmarkedItems.length} item(s) bookmarked.
        </p>
      </div>

      {bookmarkedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookmarkedItems.map((item: CulturalItem) => (
            <CulturalItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed border-border rounded-lg">
          <BookHeart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-semibold text-muted-foreground mb-2 font-body">No Bookmarks Yet</p>
          <p className="text-muted-foreground font-body text-sm">Start exploring and save your favorite cultural discoveries!</p>
        </div>
      )}
    </div>
  );
}

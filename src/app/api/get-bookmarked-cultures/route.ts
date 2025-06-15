import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getBookmarks } from '@/firebase/bookmarks';
import { NextResponse } from 'next/server';
import { CulturalItem } from '@/lib/types';

const CHUNK_SIZE = 10;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    // Fetch bookmarked item IDs from Firestore
    const bookmarkedItemIds = await getBookmarks(userId);

    if (!bookmarkedItemIds || bookmarkedItemIds.length === 0) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    // Split the bookmarked item IDs into chunks of 10
    const chunks = [];
    for (let i = 0; i < bookmarkedItemIds.length; i += CHUNK_SIZE) {
      chunks.push(bookmarkedItemIds.slice(i, i + CHUNK_SIZE));
    }

    // Fetch cultural items for each chunk
    const culturesCollection = collection(db, 'cultures');
    const bookmarkedItems: CulturalItem[] = [];
    for (const chunk of chunks) {
      const q = query(culturesCollection, where('id', 'in', chunk));
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        bookmarkedItems.push({
          id: data.id,
          name: data.name,
          summary: data.summary,
          imageUrl: data.imageUrl,
          category: data.category,
          region: data.region,
          tags: data.tags,
          ...data, // Keep other fields
        });
      });
    }

    return NextResponse.json({ data: bookmarkedItems }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookmarked cultures:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { useState, useEffect, useCallback } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { addBookmark as addBookmarkToFirestore, removeBookmark as removeBookmarkFromFirestore, getBookmarks } from "@/firebase/bookmarks";

export function useBookmarks() {
  const [user, setUser] = useState<User | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([])
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const itemIds = await getBookmarks(user.uid);
          setBookmarkedIds(itemIds);
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
        }
      } else {
        setBookmarkedIds([]);
      }
      setHydrated(true);
    });
    return () => unsubscribe();
  }, []);

  const isBookmarked = useCallback(
    (itemId: string): boolean => {
      return bookmarkedIds.includes(itemId);
    },
    [bookmarkedIds]
  );

    const addBookmark = useCallback(async (userId: string, itemId: string) => {
        try {
          await addBookmarkToFirestore(userId, itemId);
          setBookmarkedIds(prev => [...prev, itemId]);
          console.log("Bookmark added successfully!");
        } catch (error) {
          console.error("Error adding bookmark:", error);
        }
    }, []);

    const removeBookmark = useCallback(async (userId: string, itemId: string) => {
        try {
          await removeBookmarkFromFirestore(userId, itemId);
          setBookmarkedIds(prev => prev.filter(id => id !== itemId));
          console.log("Bookmark removed successfully!");
        } catch (error) {
          console.error("Error removing bookmark:", error);
        }
    }, []);

  const toggleBookmark = useCallback(
    (itemId: string) => {
        console.log("toggleBookmark called with itemId:", itemId);
        if(!user){
            console.log("No user is logged in");
            return;
        }

      if (isBookmarked(itemId)) {
        console.log("Removing bookmark");
        removeBookmark(user.uid, itemId);
      } else {
        console.log("Adding bookmark");
        addBookmark(user.uid, itemId);
      }
    },
    [isBookmarked, addBookmark, removeBookmark, user]
  );

  return {
    user,
    bookmarkedIds,
    hydrated,
    toggleBookmark,
    isBookmarked,
  };
}

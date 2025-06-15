import { db } from '@/lib/firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

/**
 * Add a cultural item ID to a user's bookmarks.
 */
export async function addBookmark(userId: string, itemId: string) {
  try {
    const docRef = doc(db, "bookmarks", userId);
    await updateDoc(docRef, {
      itemIds: arrayUnion(itemId),
    });
    console.log("Bookmark added successfully for", userId, itemId)
  } catch (error) {
    console.error("Error adding bookmark:", error);
    throw error;
  }
}

/**
 * Remove a cultural item ID from a user's bookmarks.
 */
export async function removeBookmark(userId: string, itemId: string) {
  try {
    const docRef = doc(db, "bookmarks", userId);
    await updateDoc(docRef, {
      itemIds: arrayRemove(itemId),
    });
    console.log("Bookmark removed successfully for", userId, itemId)
  } catch (error) {
    console.error("Error removing bookmark:", error);
    throw error;
  }
}

/**
 * Get the bookmarked item IDs for a user.
 */
export async function getBookmarks(userId: string): Promise<string[]> {
  try {
    const docRef = doc(db, "bookmarks", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return (data?.itemIds || []) as string[];
    } else {
      // If the document doesn't exist, create it with an empty array
      await setDoc(docRef, { itemIds: [] });
      return [];
    }
  } catch (error) {
    console.error("Error getting bookmarks:", error);
    throw error;
  }
}

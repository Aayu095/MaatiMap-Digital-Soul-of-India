// /app/search/page.tsx
import { Suspense } from 'react';
import SearchPageContent from './SearchPageContent';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading search results...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

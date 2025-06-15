'use client';

import InteractiveIndiaMap from "@/components/InteractiveIndiaMap";
import Link from 'next/link';

export default function MapPage() {
  return (
    <div className="text-foreground">
      <header className="bg-[#1C1C1E] text-[#F3E4BE] px-6 py-4 flex items-center justify-between shadow-md z-50 relative">
        {/* Logo - Click to go home */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="https://i.postimg.cc/4xTXVnpN/mandala.png" alt="MaatiMap Logo" className="h-8" />
          <span className="text-xl font-bold text-[#F3E4BE]">MaatiMap</span>
        </Link>
      </header>
      <section className="py-16 lg:py-24 bg-background/90 backdrop-blur-md border-t border-border/40">
        <div className="container max-w-screen-xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-8 text-primary">
            Discover Culture by Region
          </h2>
          <InteractiveIndiaMap />
        </div>
      </section>
    </div>
  );
}

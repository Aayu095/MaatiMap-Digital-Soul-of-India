'use client';

import { Suspense } from 'react';
import Header from '@/components/layout/header';
import Link from 'next/link';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <main className="flex-1">{children}</main>

      <footer className="py-8 bg-background/80 backdrop-blur-sm border-t border-border/40 text-muted-foreground">
        <div className="container mx-auto max-w-screen-xl px-4 md:px-6 text-center text-sm">
          <div className="mb-2">
            <Link href="/about" className="hover:text-foreground transition-colors">
              About Us
            </Link>
            <span className="mx-2 text-muted-foreground/50">|</span>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
            <span className="mx-2 text-muted-foreground/50">|</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
          <p>
            &copy; 2025 MaatiMap. All rights reserved. Explore the Digital Soul of India.
          </p>
        </div>
      </footer>
    </div>
  );
}

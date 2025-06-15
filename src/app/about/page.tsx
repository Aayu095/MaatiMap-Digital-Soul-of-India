'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-8 max-w-3xl mx-auto pt-24">
      {/* ✅ Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-[#1C1C1E] text-[#F3E4BE] px-6 py-4 flex items-center justify-between shadow-md z-50">
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="https://i.postimg.cc/4xTXVnpN/mandala.png"
            alt="MaatiMap Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-xl font-bold text-[#F3E4BE]">MaatiMap</span>
        </Link>
      </header>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-4 text-center text-primary">About MaatiMap</h1>
      <Separator className="mb-6" />

      {/* About Card */}
      <Card className="bg-muted/20 shadow-lg border-none">
        <CardContent className="p-6 space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">MaatiMap</strong> is a cultural discovery platform dedicated to
            preserving and celebrating the diverse heritage of India. From ancient rituals and folk art
            to traditional food, music, and festivals, we aim to bring regional stories to a national and
            global audience.
          </p>

          <p>
            Our interactive map lets you explore cultural gems by region, while our curated content helps you
            learn, share, and connect with local traditions. Whether you're a traveler, a student, or just
            culturally curious — MaatiMap invites you to journey through the soul of India.
          </p>

          <p>
            We believe culture is not just history — it's living, breathing, and evolving. By contributing to
            MaatiMap, you're helping document and preserve traditions that deserve to be remembered and celebrated.
          </p>

          <p className="italic text-xs text-right mt-6">
            Made with ❤️ by Team the_bits | 2025
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

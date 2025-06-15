'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-8 max-w-3xl mx-auto pt-24">
      {/* Fixed Header */}
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

      <h1 className="text-3xl font-bold mb-4 text-center text-primary">Privacy Policy</h1>
      <Separator className="mb-6" />

      <Card className="bg-muted/20 shadow-lg border-none">
        <CardContent className="p-6 space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
          <p>
            At MaatiMap, your privacy is important to us. We are committed to protecting any personal information
            you share with us and ensuring that your cultural discovery journey remains secure and respectful.
          </p>

          <p>
            We do not collect any personal data without your consent. Any data we use is solely for improving your
            experience and will never be sold or shared with third parties.
          </p>

          <p>
            This platform is built to respect your digital space while celebrating the rich cultural heritage of India.
          </p>

          <p className="italic text-xs text-right mt-6">
            Last updated: June 14, 2025
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
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

      <h1 className="text-3xl font-bold mb-4 text-center text-primary">Contact Us</h1>
      <Separator className="mb-6" />

      <Card className="bg-muted/20 shadow-lg border-none">
        <CardContent className="p-6 space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
          <p>
            We'd love to hear from you! Whether you have feedback, want to contribute, or just have a question,
            feel free to reach out.
          </p>

          <ul className="list-disc list-inside">
            <li>
              Aayushi Goel:{" "}
              <a href="mailto:aayushigoel73@gmail.com" className="text-primary underline">
                aayushigoel73@gmail.com
              </a>
            </li>
            <li>
              M S Abhishek:{" "}
              <a href="mailto:msabhishekanni10@gmail.com" className="text-primary underline">
                msabhishekanni10@gmail.com
              </a>
            </li>
          </ul>

          <p className="italic text-xs text-right mt-6">
            Made with ❤️ by Team the_bits | 2025
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

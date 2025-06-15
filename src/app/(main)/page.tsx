"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const upcomingEvent = {
  name: "Theyyam",
  location: "Kerala",
  date: "April 7 - 14",
  imageUrl: "https://i.postimg.cc/pLhBc0Gy/theyyam.jpg",
  imageHint: "Theyyam ritual dark",
  href: "/discover/festivals/theyyam-placeholder",
};

const localHighlight = {
  name: "Near You",
  description: "Based on your location",
  imageUrl: "https://i.postimg.cc/2yB7xrCT/culture-29-07-24-E-blog7.png",
  imageHint: "local market dark",
  href: "/nearby",
};

const tourPlanner = {
  title: "Plan a cultural trip to Rajasthan",
  imageUrl: "https://i.postimg.cc/3wNy51zD/Customised-travel-packages-for-Rajasthan.png",
  imageHint: "Rajasthan fort dark",
  href: "/ai-guide",
};

const communityStories = [
  {
    id: "madhubani",
    name: "Madhubani Painting",
    location: "Bihar",
    imageUrl: "https://i.postimg.cc/wMmMJmxf/Peacock-Madhubani-Painting-Folk-Art-Of-India-af8a25dc-dbe6-44b2-ab61-200d1f566721.jpg",
    imageHint: "Madhubani art dark",
    href: "/discover/art-forms/madhubani-placeholder",
  },
  {
    id: "biryani-story",
    name: "Biryani",
    location: "Hyderabad",
    imageUrl: "https://i.postimg.cc/cL9ThXp5/hyderabadi-biryani.jpg",
    imageHint: "Hyderabadi Biryani dark",
    href: "/discover/food/biryani-hyderabadi",
  },
  {
    id: "bharatanatyam",
    name: "Bharatanatyam",
    location: "Tamil Nadu",
    imageUrl: "https://i.postimg.cc/cH1nHZK6/baharatanatyama.jpg",
    imageHint: "Bharatanatyam dance dark",
    href: "/discover/art-forms/bharatanatyam-placeholder",
  },
  {
    id: "meenakari",
    name: "Meenakari Work",
    location: "Rajasthan",
    imageUrl: "https://i.postimg.cc/dVgByLPh/Meenakari-work.jpg",
    imageHint: "Meenakari craft dark",
    href: "/discover/art-forms/meenakari-placeholder",
  },
];

export default function HomePage() {
  const homepageBackgroundImageUrl = "https://i.postimg.cc/52yMfCv6/Chat-GPT-Image-Jun-6-2025-11-09-18-AM.png";

  return (
    <div
      className="text-foreground"
      style={{
        backgroundImage: `url('${homepageBackgroundImageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="relative py-16 md:py-24 lg:py-32 container max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="relative z-10 text-left md:w-2/3 lg:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline mb-6 text-shadow-lg">
            Explore <br /> Cultural India
          </h1>
          <p className="text-base md:text-lg text-foreground/80 mb-8 font-body max-w-xl">
            Discover artforms, traditions, food, and festivals across every region.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" className="px-8 py-3 text-sm rounded-lg shadow-lg">
              <Link href="/map">Interactive Map</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="px-8 py-3 text-sm rounded-lg shadow-lg">
              <Link href="/ai-guide">Ask AI Guide</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mid Section Cards */}
      <section className="py-12 lg:py-20 bg-background/70 backdrop-blur-sm">
        <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-card border-border/50 shadow-xl overflow-hidden flex flex-col group relative">
              <Link href={upcomingEvent.href} className="block">
                <div className="relative w-full h-96 md:h-[450px]">
                  <Image
                    src={upcomingEvent.imageUrl}
                    alt={upcomingEvent.name}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={upcomingEvent.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <CardContent className="absolute bottom-0 left-0 p-5 z-10 text-white w-full">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-primary mb-1">Upcoming Events</h3>
                  <CardTitle className="text-xl font-headline mb-1 text-foreground">{upcomingEvent.name}</CardTitle>
                  <p className="text-xs font-body text-foreground/80">{upcomingEvent.location}</p>
                  <p className="text-xs font-body text-foreground/70">{upcomingEvent.date}</p>
                </CardContent>
              </Link>
            </Card>

            <div className="space-y-6 lg:space-y-8 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              <Card className="bg-card border-border/50 shadow-xl overflow-hidden group">
                <Link href={localHighlight.href} className="block h-full">
                  <div className="relative w-full h-40 sm:h-48">
                    <Image
                      src={localHighlight.imageUrl}
                      alt={localHighlight.name}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint={localHighlight.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
                  </div>
                  <CardContent className="p-5">
                    <CardTitle className="text-lg font-headline mb-1 group-hover:text-primary transition-colors">{localHighlight.name}</CardTitle>
                    <p className="text-sm text-foreground/70 font-body flex items-center">
                      {localHighlight.description}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </CardContent>
                </Link>
              </Card>

              <Card className="bg-card border-border/50 shadow-xl overflow-hidden group">
                <Link href={tourPlanner.href} className="block h-full">
                  <div className="relative w-full h-40 sm:h-48">
                    <Image
                      src={tourPlanner.imageUrl}
                      alt={tourPlanner.title}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint={tourPlanner.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-primary mb-1">Tour Planner</h3>
                    <CardTitle className="text-lg font-headline mb-1 group-hover:text-primary transition-colors leading-tight">{tourPlanner.title}</CardTitle>
                    <p className="text-sm text-foreground/70 font-body flex items-center">
                      Plan your trip <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-background/70 backdrop-blur-sm">
        <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-headline">Community Stories</h2>
            <Button variant="link" asChild className="text-primary hover:text-primary/80 text-sm">
              <Link href="/feed">View More <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {communityStories.map((story) => (
              <Card key={story.id} className="bg-card border-border/50 shadow-lg overflow-hidden group">
                <Link href={story.href} className="block">
                  <CardHeader className="p-0">
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={story.imageUrl}
                        alt={story.name}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={story.imageHint}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-base font-headline mb-1 group-hover:text-primary transition-colors">{story.name}</CardTitle>
                    <CardDescription className="text-xs text-foreground/70 font-body">{story.location}</CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MaatiLoot Spin Wheel Section */}
      <section className="py-16 lg:py-24 bg-background/80 backdrop-blur-md border-t border-border/40">
        <div className="container max-w-screen-xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6 text-primary">
            Try Your Luck at <span className="text-foreground">MaatiLoot</span> 🎉
          </h2>
          <p className="text-sm md:text-base text-foreground/70 font-body max-w-2xl mx-auto mb-10">
            Spin the cultural wheel and win virtual rewards from different regions of India – from folk tales to food trails!
          </p>

          <div className="flex justify-center">
            <iframe
              src="/maatiloot"
              className="w-full max-w-3xl h-[480px] rounded-2xl shadow-2xl border border-border/50"
              style={{ backgroundColor: '#0f0f0f' }}
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
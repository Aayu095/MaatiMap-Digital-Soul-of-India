"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { UserCircle } from 'lucide-react';
import { Palette, CookingPot, Landmark, HandHeart, Music as MusicIconLucide, PartyPopper, Search as SearchIcon, LayoutGrid, BookHeart } from 'lucide-react'; // Renamed Search to SearchIcon

interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon; 
}

// Keep all items here for mobile menu and potential future use
const mainNavItems: NavItem[] = [
  { href: '/discover?category=art', label: 'Art', icon: Palette },
  { href: '/discover?category=food', label: 'Food', icon: CookingPot },
  { href: '/discover?category=heritage-sites', label: 'Heritage', icon: Landmark },
  { href: '/discover?category=rituals', label: 'Rituals', icon: HandHeart },
  { href: '/discover?category=music', label: 'Music', icon: MusicIconLucide },
  { href: '/discover?category=festivals', label: 'Festivals', icon: PartyPopper },
  { href: '/discover', label: 'Discover', icon: SearchIcon },
  { href: '/feed', label: 'Feed', icon: LayoutGrid },
  { href: '/bookmarks', label: 'Bookmarks', icon: BookHeart },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];


interface NavLinksProps {
  isMobile?: boolean;
  onLinkClick?: () => void; 
  desktopLinkCount?: number; // Number of links to show on desktop
}

export default function NavLinks({ isMobile = false, onLinkClick, desktopLinkCount }: NavLinksProps) {
  const pathname = usePathname();
  const currentCategory = pathname.includes('/discover?category=') ? pathname.split('=')[1] : null;

  const itemsToDisplay = isMobile ? mainNavItems : (desktopLinkCount ? mainNavItems.slice(0, desktopLinkCount) : mainNavItems);

  return (
    <>
      {itemsToDisplay.map((item) => {
        const isActive = item.href.startsWith('/discover?category=') 
          ? currentCategory === item.href.split('=')[1] && pathname.startsWith('/discover')
          : pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onLinkClick}
            className={cn(
              "flex items-center px-3 py-1.5 rounded-md font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-foreground hover:bg-accent hover:text-accent-foreground",
              isMobile ? "text-base w-full justify-start" : "text-sm",
            )}
          >
            {isMobile && item.icon && <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />}
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

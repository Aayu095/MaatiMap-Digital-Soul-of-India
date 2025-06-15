import type { LucideIcon } from 'lucide-react';

export type CulturalCategorySlug = 'art' | 'food' | 'heritage-sites' | 'rituals' | 'music' | 'festivals';

export interface CulturalCategory {
  name: string;
  slug: CulturalCategorySlug;
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>; // Allow Lucide or custom SVG
  description: string;
}

export interface CulturalItem {
  id: string;
  title: string;
  summary: string;
  category: CulturalCategorySlug
  imageUrl: string;
  imageHint?: string;
  latitude?: number;
  longitude?: number;
  region: string;
  tags: string[];
  description?: string;
} 

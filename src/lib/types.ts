import type { LucideIcon } from 'lucide-react';
import type { Timestamp } from 'firebase/firestore';

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
  latitude: number; // Required for map features
  longitude: number; // Required for map features
  region: string;
  state: string; // Added for state-based filtering
  tags: string[];
  description?: string;
  formattedAddress?: string; // MapMyIndia formatted address

  // GeoJSON location for MongoDB geospatial queries
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude] - MongoDB format
  };

  // Enhanced address components from MapMyIndia
  address?: {
    formatted: string; // Full formatted address
    district?: string;
    state: string;
    pincode?: string;
    locality?: string;
    city?: string;
  };

  // Geocoding metadata
  geocoded?: boolean;
  geocodedAt?: Timestamp | Date;
  geocodeSource?: 'mapmyindia' | 'manual' | 'google';
}

// Event Types
export type EventCategory = 'festivals' | 'rituals' | 'music' | 'dance' | 'food' | 'heritage' | 'cultural';

export type EventStatus = 'upcoming' | 'ongoing' | 'past';

export interface Event {
  id: string;
  title: string;
  description: string;
  summary: string;
  category: EventCategory;

  // Location
  state: string;
  city?: string;
  region: string;
  latitude?: number;
  longitude?: number;

  // Dates (Firebase Timestamp or Date)
  startDate: Timestamp | Date;
  endDate: Timestamp | Date;

  // Media
  imageUrl: string;
  imageHint?: string;
  images?: string[]; // Additional images

  // Metadata
  tags: string[];
  significance?: string; // Cultural/historical significance
  relatedCulturalItems?: string[]; // IDs of related cultural items

  // Display
  featured?: boolean;
  priority?: number; // For sorting featured events

  // Timestamps
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}

// Cultural Location Types (for map markers)
export type LocationType = 'state' | 'district' | 'city' | 'town' | 'village' | 'heritage-site';
export type LocationCategory = 'heritage' | 'festival' | 'art' | 'food' | 'music' | 'craft' | 'tradition';

export interface CulturalLocation {
  id: string;
  name: string;
  nameHindi: string;
  type: LocationType;
  coordinates: [number, number]; // [latitude, longitude]

  // Cultural data
  story: string;
  category: LocationCategory;
  images: string[];

  // Hierarchy
  state: string;
  district?: string;

  // Display settings
  minZoom: number; // Minimum zoom level to show this location
  importance: 1 | 2 | 3; // 1=major, 2=medium, 3=minor

  // Optional metadata
  tags?: string[];
  relatedItems?: string[]; // IDs of related cultural items
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}


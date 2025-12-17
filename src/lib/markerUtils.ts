import L from 'leaflet';
import type { LocationCategory } from './types';

/**
 * Configuration for marker icons based on category
 */
const MARKER_CONFIG: Record<LocationCategory, { color: string; emoji: string; label: string }> = {
    heritage: {
        color: '#8B4513',
        emoji: '🏛️',
        label: 'Heritage Site',
    },
    festival: {
        color: '#FF6B6B',
        emoji: '🎉',
        label: 'Festival',
    },
    art: {
        color: '#4ECDC4',
        emoji: '🎨',
        label: 'Art & Culture',
    },
    food: {
        color: '#FFE66D',
        emoji: '🍛',
        label: 'Cuisine',
    },
    music: {
        color: '#A8E6CF',
        emoji: '🎵',
        label: 'Music & Dance',
    },
    craft: {
        color: '#FF8B94',
        emoji: '🧵',
        label: 'Handicrafts',
    },
    tradition: {
        color: '#9D84B7',
        emoji: '🕉️',
        label: 'Tradition',
    },
};

/**
 * Create a custom marker icon based on category and importance
 */
export function createCustomMarkerIcon(category: LocationCategory, importance: 1 | 2 | 3 = 2): L.DivIcon {
    const config = MARKER_CONFIG[category];

    // Size based on importance: 1=large, 2=medium, 3=small
    const size = importance === 1 ? 44 : importance === 2 ? 36 : 28;
    const fontSize = importance === 1 ? 24 : importance === 2 ? 20 : 16;

    return L.divIcon({
        html: `
      <div class="custom-marker" style="
        background: ${config.color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${fontSize}px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.25), 0 0 0 3px white;
        border: 2px solid white;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      ">
        ${config.emoji}
      </div>
      <style>
        .custom-marker:hover {
          transform: scale(1.15);
          box-shadow: 0 6px 16px rgba(0,0,0,0.35), 0 0 0 4px white;
          z-index: 1000 !important;
        }
      </style>
    `,
        className: 'custom-marker-wrapper',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2],
    });
}

/**
 * Get marker configuration for a category
 */
export function getMarkerConfig(category: LocationCategory) {
    return MARKER_CONFIG[category];
}

/**
 * Get all available categories with their configurations
 */
export function getAllMarkerCategories() {
    return Object.entries(MARKER_CONFIG).map(([key, config]) => ({
        category: key as LocationCategory,
        ...config,
    }));
}

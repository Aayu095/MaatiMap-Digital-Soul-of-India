/**
 * Custom cultural marker icons for the map
 * Provides emoji-based icons for different cultural categories
 */

export type CulturalIconCategory =
    | 'temple'
    | 'fort'
    | 'art'
    | 'dance'
    | 'festival'
    | 'food'
    | 'story'
    | 'heritage'
    | 'music';

export type MarkerSize = 'small' | 'medium' | 'large';

// Icon mapping for cultural categories
export const CULTURAL_ICONS: Record<CulturalIconCategory, string> = {
    temple: '🛕',
    fort: '🏰',
    art: '🎨',
    dance: '💃',
    festival: '🎉',
    food: '🍛',
    story: '📖',
    heritage: '🏛️',
    music: '🎵',
};

// Size configurations
const SIZE_CONFIG = {
    small: { size: 24, fontSize: '16px' },
    medium: { size: 32, fontSize: '20px' },
    large: { size: 40, fontSize: '28px' },
};

/**
 * Create a custom cultural marker icon
 */
export function createCulturalMarkerIcon(
    category: CulturalIconCategory,
    size: MarkerSize = 'medium'
) {
    const icon = CULTURAL_ICONS[category] || '📍';
    const config = SIZE_CONFIG[size];

    const html = `
    <div class="cultural-marker cultural-marker-${size}" style="
      width: ${config.size}px;
      height: ${config.size}px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${config.fontSize};
      background: white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      border: 2px solid #ff8c42;
      cursor: pointer;
      transition: transform 0.2s;
    ">
      ${icon}
    </div>
  `;

    return {
        html,
        className: 'custom-cultural-icon',
        iconSize: [config.size, config.size] as [number, number],
        iconAnchor: [config.size / 2, config.size / 2] as [number, number],
    };
}

/**
 * Map location category to icon category
 */
export function getCategoryIcon(locationCategory: string): CulturalIconCategory {
    const categoryMap: Record<string, CulturalIconCategory> = {
        'Temple': 'temple',
        'Fort': 'fort',
        'Art': 'art',
        'Dance': 'dance',
        'Festival': 'festival',
        'Food': 'food',
        'Story': 'story',
        'Heritage': 'heritage',
        'Music': 'music',
        'Monument': 'fort',
        'Craft': 'art',
        'Performance': 'dance',
    };

    return categoryMap[locationCategory] || 'heritage';
}

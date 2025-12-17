/**
 * State-level cultural icons for zoom level 1
 * Each state gets a representative cultural icon
 */

export const STATE_ICONS: Record<string, string> = {
    // North India
    'Jammu and Kashmir': '🏔️',
    'Himachal Pradesh': '⛰️',
    'Punjab': '🥁',
    'Haryana': '🌾',
    'Delhi': '🏛️',
    'Uttarakhand': '🕉️',
    'Uttar Pradesh': '🕌',

    // East India
    'Bihar': '📿',
    'Jharkhand': '🌳',
    'West Bengal': '🎭',
    'Odisha': '🛕',
    'Sikkim': '🏔️',

    // West India
    'Rajasthan': '👑',
    'Gujarat': '🪔',
    'Maharashtra': '🎪',
    'Goa': '🏖️',

    // South India
    'Karnataka': '🎨',
    'Kerala': '🎭',
    'Tamil Nadu': '🕉️',
    'Andhra Pradesh': '🛕',
    'Telangana': '💎',

    // Northeast India
    'Assam': '🍵',
    'Meghalaya': '☔',
    'Manipur': '💃',
    'Tripura': '🎋',
    'Nagaland': '🎺',
    'Mizoram': '🎋',
    'Arunachal Pradesh': '🏔️',

    // Central India
    'Madhya Pradesh': '🏰',
    'Chhattisgarh': '🌾',
};

/**
 * Get icon for a state
 */
export function getStateIcon(stateName: string): string {
    return STATE_ICONS[stateName] || '📍';
}

/**
 * Create state icon marker for zoom level 1
 */
export function createStateIconMarker(stateName: string) {
    const icon = getStateIcon(stateName);

    const html = `
    <div class="state-icon-marker" style="
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      background: white;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      border: 3px solid #ff8c42;
      cursor: pointer;
      transition: all 0.3s;
    ">
      ${icon}
    </div>
  `;

    return {
        html,
        className: 'custom-state-icon',
        iconSize: [48, 48] as [number, number],
        iconAnchor: [24, 24] as [number, number],
    };
}

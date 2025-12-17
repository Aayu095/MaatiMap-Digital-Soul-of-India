/**
 * Map styling utilities for the dynamic India map
 * Vibrant color scheme inspired by cultural regions
 */

// State colors - vibrant and distinct for each state
export const STATE_COLORS: Record<string, string> = {
    // North India (Blue/Cyan/Yellow shades)
    'Jammu and Kashmir': '#FF6B35',      // Orange-red
    'Himachal Pradesh': '#00D9FF',       // Bright cyan
    'Punjab': '#FFD23F',                 // Golden yellow
    'Haryana': '#A0E7E5',                // Light cyan
    'Delhi': '#FECA57',                  // Bright yellow
    'Uttarakhand': '#FF9FF3',            // Pink
    'Uttar Pradesh': '#FFD93D',          // Yellow

    // East India (Green/Sky blue shades)
    'Bihar': '#A8E6CF',                  // Mint green
    'Jharkhand': '#DDA0DD',              // Plum
    'West Bengal': '#87CEEB',            // Sky blue
    'Odisha': '#98FB98',                 // Pale green
    'Sikkim': '#FF8C00',                 // Dark orange

    // West India (Red/Purple/Green shades)
    'Rajasthan': '#DC143C',              // Crimson
    'Gujarat': '#32CD32',                // Lime green
    'Maharashtra': '#FF4500',            // Orange-red
    'Goa': '#FFB6C1',                    // Light pink

    // South India (Purple/Green/Pink shades)
    'Karnataka': '#9370DB',              // Medium purple
    'Kerala': '#228B22',                 // Forest green
    'Tamil Nadu': '#FF1493',             // Deep pink
    'Andhra Pradesh': '#20B2AA',         // Light sea green
    'Telangana': '#FFA500',              // Orange

    // Northeast India (Cyan/Pink/Purple shades)
    'Assam': '#00CED1',                  // Dark turquoise
    'Meghalaya': '#9ACD32',              // Yellow green
    'Manipur': '#FF69B4',                // Hot pink
    'Tripura': '#BA55D3',                // Medium orchid
    'Nagaland': '#FF6347',               // Tomato
    'Mizoram': '#7FFF00',                // Chartreuse
    'Arunachal Pradesh': '#8A2BE2',      // Blue violet

    // Central India (Brown/Yellow shades)
    'Madhya Pradesh': '#CD853F',         // Peru
    'Chhattisgarh': '#F0E68C',           // Khaki
};

// Regional groupings for legend
export const REGIONS: Record<string, string[]> = {
    'North': ['Jammu and Kashmir', 'Himachal Pradesh', 'Punjab', 'Haryana', 'Delhi', 'Uttarakhand', 'Uttar Pradesh'],
    'East': ['Bihar', 'Jharkhand', 'West Bengal', 'Odisha', 'Sikkim'],
    'West': ['Rajasthan', 'Gujarat', 'Maharashtra', 'Goa'],
    'South': ['Karnataka', 'Kerala', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana'],
    'Northeast': ['Assam', 'Meghalaya', 'Manipur', 'Tripura', 'Nagaland', 'Mizoram', 'Arunachal Pradesh'],
    'Central': ['Madhya Pradesh', 'Chhattisgarh'],
};

/**
 * Get color for a state
 */
export function getStateColor(stateName: string): string {
    return STATE_COLORS[stateName] || '#CCCCCC'; // Default gray if not found
}

/**
 * Get hover color (brighten by 20%)
 */
export function getHoverColor(baseColor: string): string {
    // Convert hex to RGB
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);

    // Brighten by 20%
    const brighten = (val: number) => Math.min(255, Math.floor(val * 1.2));

    const newR = brighten(r);
    const newG = brighten(g);
    const newB = brighten(b);

    // Convert back to hex
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * Get region name for a state
 */
export function getRegionName(stateName: string): string {
    for (const [region, states] of Object.entries(REGIONS)) {
        if (states.includes(stateName)) {
            return region;
        }
    }
    return 'Other';
}

/**
 * Get all states in a region
 */
export function getStatesInRegion(regionName: string): string[] {
    return REGIONS[regionName] || [];
}

/**
 * Leaflet style function for GeoJSON features
 */
export function getFeatureStyle(feature: any) {
    const stateName = feature.properties.ST_NM || feature.properties.name;
    const baseColor = getStateColor(stateName);

    return {
        fillColor: baseColor,
        weight: 2,
        opacity: 1,
        color: '#333333',
        fillOpacity: 0.7,
    };
}

/**
 * Leaflet hover style
 */
export function getHoverStyle(feature: any) {
    const stateName = feature.properties.ST_NM || feature.properties.name;
    const baseColor = getStateColor(stateName);
    const hoverColor = getHoverColor(baseColor);

    return {
        fillColor: hoverColor,
        weight: 3,
        opacity: 1,
        color: '#000000',
        fillOpacity: 0.9,
    };
}

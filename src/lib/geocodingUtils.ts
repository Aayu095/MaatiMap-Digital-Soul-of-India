/**
 * Geocoding utilities for converting location names to coordinates
 * Uses Nominatim (OpenStreetMap) API - free and no API key required
 */

interface NominatimResponse {
    lat: string;
    lon: string;
    display_name: string;
}

interface GeocodeResult {
    latitude: number;
    longitude: number;
    formattedAddress: string;
}

// Fallback coordinates for major Indian cities
const CITY_COORDINATES: Record<string, GeocodeResult> = {
    'Delhi': { latitude: 28.6139, longitude: 77.2090, formattedAddress: 'New Delhi, India' },
    'Mumbai': { latitude: 19.0760, longitude: 72.8777, formattedAddress: 'Mumbai, Maharashtra, India' },
    'Kolkata': { latitude: 22.5726, longitude: 88.3639, formattedAddress: 'Kolkata, West Bengal, India' },
    'Chennai': { latitude: 13.0827, longitude: 80.2707, formattedAddress: 'Chennai, Tamil Nadu, India' },
    'Bangalore': { latitude: 12.9716, longitude: 77.5946, formattedAddress: 'Bangalore, Karnataka, India' },
    'Hyderabad': { latitude: 17.3850, longitude: 78.4867, formattedAddress: 'Hyderabad, Telangana, India' },
    'Ahmedabad': { latitude: 23.0225, longitude: 72.5714, formattedAddress: 'Ahmedabad, Gujarat, India' },
    'Pune': { latitude: 18.5204, longitude: 73.8567, formattedAddress: 'Pune, Maharashtra, India' },
    'Jaipur': { latitude: 26.9124, longitude: 75.7873, formattedAddress: 'Jaipur, Rajasthan, India' },
    'Lucknow': { latitude: 26.8467, longitude: 80.9462, formattedAddress: 'Lucknow, Uttar Pradesh, India' },
    'Agra': { latitude: 27.1767, longitude: 78.0081, formattedAddress: 'Agra, Uttar Pradesh, India' },
    'Varanasi': { latitude: 25.3176, longitude: 82.9739, formattedAddress: 'Varanasi, Uttar Pradesh, India' },
    'Amritsar': { latitude: 31.6340, longitude: 74.8723, formattedAddress: 'Amritsar, Punjab, India' },
    'Goa': { latitude: 15.2993, longitude: 74.1240, formattedAddress: 'Goa, India' },
    'Kochi': { latitude: 9.9312, longitude: 76.2673, formattedAddress: 'Kochi, Kerala, India' },
    'Mysore': { latitude: 12.2958, longitude: 76.6394, formattedAddress: 'Mysore, Karnataka, India' },
    'Udaipur': { latitude: 24.5854, longitude: 73.7125, formattedAddress: 'Udaipur, Rajasthan, India' },
    'Shimla': { latitude: 31.1048, longitude: 77.1734, formattedAddress: 'Shimla, Himachal Pradesh, India' },
    'Darjeeling': { latitude: 27.0410, longitude: 88.2663, formattedAddress: 'Darjeeling, West Bengal, India' },
    'Ooty': { latitude: 11.4102, longitude: 76.6950, formattedAddress: 'Ooty, Tamil Nadu, India' },
};

/**
 * Geocode a location name to coordinates using Nominatim API
 * @param locationName - Name of the location (e.g., "Taj Mahal, Agra, India")
 * @returns GeocodeResult with latitude, longitude, and formatted address
 */
export async function geocodeLocation(locationName: string): Promise<GeocodeResult | null> {
    try {
        // Check if it's a known city first
        const cityMatch = Object.keys(CITY_COORDINATES).find(city =>
            locationName.toLowerCase().includes(city.toLowerCase())
        );

        if (cityMatch) {
            console.log(`Using fallback coordinates for ${cityMatch}`);
            return CITY_COORDINATES[cityMatch];
        }

        // Call Nominatim API
        const query = encodeURIComponent(`${locationName}, India`);
        const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'MaatiMap/1.0' // Required by Nominatim
            }
        });

        if (!response.ok) {
            throw new Error(`Nominatim API error: ${response.statusText}`);
        }

        const data: NominatimResponse[] = await response.json();

        if (data.length === 0) {
            console.warn(`No results found for: ${locationName}`);
            return null;
        }

        const result = data[0];
        return {
            latitude: parseFloat(result.lat),
            longitude: parseFloat(result.lon),
            formattedAddress: result.display_name
        };

    } catch (error) {
        console.error(`Geocoding error for ${locationName}:`, error);
        return null;
    }
}

/**
 * Add delay between API calls to respect rate limits
 * Nominatim allows 1 request per second
 */
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Batch geocode multiple location names
 * @param locations - Array of location names
 * @param delayMs - Delay between requests in milliseconds (default 1000ms)
 * @returns Array of GeocodeResults (null for failed geocodes)
 */
export async function batchGeocode(
    locations: string[],
    delayMs: number = 1000
): Promise<(GeocodeResult | null)[]> {
    const results: (GeocodeResult | null)[] = [];

    for (let i = 0; i < locations.length; i++) {
        console.log(`Geocoding ${i + 1}/${locations.length}: ${locations[i]}`);

        const result = await geocodeLocation(locations[i]);
        results.push(result);

        // Add delay between requests (except for last one)
        if (i < locations.length - 1) {
            await delay(delayMs);
        }
    }

    return results;
}

/**
 * Extract location string from cultural item
 * Tries to build the most specific location string possible
 */
export function extractLocationString(item: {
    title: string;
    region: string;
    state?: string;
    tags?: string[];
}): string {
    // Try to find city/place name in tags
    const locationTags = item.tags?.filter(tag =>
        !['art', 'food', 'heritage', 'ritual', 'music', 'festival'].includes(tag.toLowerCase())
    );

    if (locationTags && locationTags.length > 0) {
        return `${item.title}, ${locationTags[0]}, ${item.state || item.region}, India`;
    }

    return `${item.title}, ${item.state || item.region}, India`;
}

/**
 * Get state coordinates (center of state)
 */
const STATE_CENTERS: Record<string, { latitude: number; longitude: number }> = {
    'Jammu and Kashmir': { latitude: 33.7782, longitude: 76.5762 },
    'Himachal Pradesh': { latitude: 31.1048, longitude: 77.1734 },
    'Punjab': { latitude: 31.1471, longitude: 75.3412 },
    'Haryana': { latitude: 29.0588, longitude: 76.0856 },
    'Delhi': { latitude: 28.7041, longitude: 77.1025 },
    'Uttarakhand': { latitude: 30.0668, longitude: 79.0193 },
    'Uttar Pradesh': { latitude: 26.8467, longitude: 80.9462 },
    'Bihar': { latitude: 25.0961, longitude: 85.3131 },
    'Jharkhand': { latitude: 23.6102, longitude: 85.2799 },
    'West Bengal': { latitude: 22.9868, longitude: 87.8550 },
    'Odisha': { latitude: 20.9517, longitude: 85.0985 },
    'Chhattisgarh': { latitude: 21.2787, longitude: 81.8661 },
    'Madhya Pradesh': { latitude: 22.9734, longitude: 78.6569 },
    'Rajasthan': { latitude: 27.0238, longitude: 74.2179 },
    'Gujarat': { latitude: 22.2587, longitude: 71.1924 },
    'Maharashtra': { latitude: 19.7515, longitude: 75.7139 },
    'Goa': { latitude: 15.2993, longitude: 74.1240 },
    'Karnataka': { latitude: 15.3173, longitude: 75.7139 },
    'Kerala': { latitude: 10.8505, longitude: 76.2711 },
    'Tamil Nadu': { latitude: 11.1271, longitude: 78.6569 },
    'Andhra Pradesh': { latitude: 15.9129, longitude: 79.7400 },
    'Telangana': { latitude: 18.1124, longitude: 79.0193 },
    'Assam': { latitude: 26.2006, longitude: 92.9376 },
    'Meghalaya': { latitude: 25.4670, longitude: 91.3662 },
    'Manipur': { latitude: 24.6637, longitude: 93.9063 },
    'Tripura': { latitude: 23.9408, longitude: 91.9882 },
    'Nagaland': { latitude: 26.1584, longitude: 94.5624 },
    'Mizoram': { latitude: 23.1645, longitude: 92.9376 },
    'Arunachal Pradesh': { latitude: 28.2180, longitude: 94.7278 },
    'Sikkim': { latitude: 27.5330, longitude: 88.5122 },
};

/**
 * Get fallback coordinates for a state
 */
export function getStateCenterCoordinates(state: string): GeocodeResult | null {
    const coords = STATE_CENTERS[state];
    if (!coords) return null;

    return {
        ...coords,
        formattedAddress: `${state}, India`
    };
}

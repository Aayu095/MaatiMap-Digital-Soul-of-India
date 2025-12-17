/**
 * MapMyIndia API Service
 * Handles geocoding, reverse geocoding, and OAuth token management
 * Free tier: 250,000 map loads/month, 10,000 geocoding requests/month
 */

interface MapMyIndiaConfig {
    clientId: string;
    clientSecret: string;
}

interface GeocodeResult {
    lat: number;
    lng: number;
    formatted: string;
    district?: string;
    state?: string;
    pincode?: string;
    locality?: string;
    city?: string;
}

interface ReverseGeocodeResult {
    formatted: string;
    district?: string;
    state?: string;
    pincode?: string;
    locality?: string;
    city?: string;
}

class MapMyIndiaService {
    private config: MapMyIndiaConfig;
    private accessToken: string | null = null;
    private tokenExpiry: number = 0;

    constructor() {
        this.config = {
            clientId: process.env.MAPMYINDIA_CLIENT_ID || '',
            clientSecret: process.env.MAPMYINDIA_CLIENT_SECRET || '',
        };

        if (!this.config.clientId || !this.config.clientSecret) {
            console.warn('⚠️ MapMyIndia credentials not found in environment variables');
        }
    }

    /**
     * Get OAuth access token (cached until expiry)
     */
    private async getAccessToken(): Promise<string> {
        // Return cached token if still valid
        if (this.accessToken && Date.now() < this.tokenExpiry) {
            return this.accessToken;
        }

        try {
            const response = await fetch('https://outpost.mapmyindia.com/api/security/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: this.config.clientId,
                    client_secret: this.config.clientSecret,
                }),
            });

            if (!response.ok) {
                throw new Error(`OAuth failed: ${response.statusText}`);
            }

            const data = await response.json();
            this.accessToken = data.access_token;
            // Set expiry to 5 minutes before actual expiry for safety
            this.tokenExpiry = Date.now() + ((data.expires_in - 300) * 1000);

            console.log('✅ MapMyIndia OAuth token obtained');
            return this.accessToken!;

        } catch (error) {
            console.error('❌ MapMyIndia OAuth error:', error);
            throw error;
        }
    }

    /**
     * Geocode an address to coordinates
     * @param address - Full address string (e.g., "Taj Mahal, Agra, Uttar Pradesh")
     * @returns Coordinates and formatted address, or null if not found
     */
    async geocode(address: string): Promise<GeocodeResult | null> {
        if (!address || address.trim().length === 0) {
            return null;
        }

        try {
            const token = await this.getAccessToken();

            const response = await fetch(
                `https://atlas.mapmyindia.com/api/places/geocode?address=${encodeURIComponent(address)}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                console.error(`Geocoding failed for "${address}": ${response.statusText}`);
                return null;
            }

            const data = await response.json();

            if (data.copResults && data.copResults.length > 0) {
                const result = data.copResults[0];

                return {
                    lat: parseFloat(result.latitude || result.lat),
                    lng: parseFloat(result.longitude || result.lng),
                    formatted: result.formatted_address || result.formattedAddress,
                    district: result.district,
                    state: result.state,
                    pincode: result.pincode,
                    locality: result.locality,
                    city: result.city || result.district,
                };
            }

            console.warn(`No results found for address: "${address}"`);
            return null;

        } catch (error) {
            console.error(`Error geocoding "${address}":`, error);
            return null;
        }
    }

    /**
     * Reverse geocode coordinates to address
     * @param lat - Latitude
     * @param lng - Longitude
     * @returns Address components, or null if not found
     */
    async reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodeResult | null> {
        if (!lat || !lng) {
            return null;
        }

        try {
            const token = await this.getAccessToken();

            const response = await fetch(
                `https://atlas.mapmyindia.com/api/places/reverse_geocode?lat=${lat}&lng=${lng}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                console.error(`Reverse geocoding failed for (${lat}, ${lng}): ${response.statusText}`);
                return null;
            }

            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const result = data.results[0];

                return {
                    formatted: result.formatted_address || result.formattedAddress,
                    district: result.district,
                    state: result.state,
                    pincode: result.pincode,
                    locality: result.locality,
                    city: result.city || result.district,
                };
            }

            console.warn(`No results found for coordinates: (${lat}, ${lng})`);
            return null;

        } catch (error) {
            console.error(`Error reverse geocoding (${lat}, ${lng}):`, error);
            return null;
        }
    }

    /**
     * Batch geocode multiple addresses with rate limiting
     * @param addresses - Array of address strings
     * @param delayMs - Delay between requests in milliseconds (default: 100ms = 10 req/sec)
     * @returns Array of results (null for failed geocoding)
     */
    async batchGeocode(
        addresses: string[],
        delayMs: number = 100
    ): Promise<(GeocodeResult | null)[]> {
        const results: (GeocodeResult | null)[] = [];

        for (let i = 0; i < addresses.length; i++) {
            const address = addresses[i];
            console.log(`Geocoding ${i + 1}/${addresses.length}: ${address}`);

            const result = await this.geocode(address);
            results.push(result);

            // Rate limiting: wait between requests
            if (i < addresses.length - 1) {
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }
        }

        return results;
    }

    /**
     * Check if service is configured
     */
    isConfigured(): boolean {
        return !!(this.config.clientId && this.config.clientSecret);
    }
}

// Export singleton instance
export const mapMyIndia = new MapMyIndiaService();

// Export types
export type { GeocodeResult, ReverseGeocodeResult };

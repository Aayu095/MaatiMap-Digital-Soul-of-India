/**
 * Geocode all cultural items in MongoDB using MapMyIndia API
 * Run: node scripts/geocode-items.js
 */

const { MongoClient } = require('mongodb');
const https = require('https');
require('dotenv').config({ path: '.env' });

// MapMyIndia credentials
const CLIENT_ID = process.env.MAPMYINDIA_CLIENT_ID;
const CLIENT_SECRET = process.env.MAPMYINDIA_CLIENT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

// Configuration
const RATE_LIMIT_DELAY = 100; // 100ms between requests (10 req/sec)

// OAuth token cache
let accessToken = null;
let tokenExpiry = 0;

/**
 * Make HTTPS request
 */
function httpsRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ ok: res.statusCode === 200, json: () => JSON.parse(data), statusText: res.statusMessage });
                } catch (e) {
                    reject(e);
                }
            });
        });
        req.on('error', reject);
        if (options.body) req.write(options.body);
        req.end();
    });
}

/**
 * Get OAuth access token from MapMyIndia
 */
async function getAccessToken() {
    if (accessToken && Date.now() < tokenExpiry) {
        return accessToken;
    }

    console.log('🔑 Getting MapMyIndia OAuth token...');

    const body = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

    const response = await httpsRequest('https://outpost.mapmyindia.com/api/security/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(body)
        },
        body
    });

    if (!response.ok) {
        throw new Error(`OAuth failed: ${response.statusText}`);
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiry = Date.now() + ((data.expires_in - 300) * 1000);

    console.log('✅ OAuth token obtained');
    return accessToken;
}

/**
 * Geocode an address using MapMyIndia
 */
async function geocodeAddress(address) {
    const token = await getAccessToken();
    const encodedAddress = encodeURIComponent(address);

    const response = await httpsRequest(
        `https://atlas.mapmyindia.com/api/places/geocode?address=${encodedAddress}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
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
        };
    }

    return null;
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main geocoding function
 */
async function geocodeAllItems() {
    // Validate credentials
    if (!CLIENT_ID || !CLIENT_SECRET) {
        console.error('❌ MapMyIndia credentials not found in .env');
        console.error('Please add:');
        console.error('  MAPMYINDIA_CLIENT_ID=your_client_id');
        console.error('  MAPMYINDIA_CLIENT_SECRET=your_client_secret');
        process.exit(1);
    }

    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI not found in .env');
        process.exit(1);
    }

    const client = new MongoClient(MONGODB_URI);

    try {
        console.log('🔗 Connecting to MongoDB...');
        await client.connect();

        const db = client.db('maatimap');
        const collection = db.collection('culturalItems');

        // Find items without location
        console.log('📍 Finding items to geocode...');
        const items = await collection.find({
            $or: [
                { location: { $exists: false } },
                { location: null }
            ]
        }).toArray();

        console.log(`📍 Found ${items.length} items to geocode\n`);

        if (items.length === 0) {
            console.log('✅ All items already have location data!');
            return;
        }

        let successCount = 0;
        let failCount = 0;
        const failedItems = [];

        // Process items
        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            // Build address
            const address = `${item.title}, ${item.state || item.region}, India`;

            console.log(`Geocoding ${i + 1}/${items.length}: ${address}`);

            try {
                const result = await geocodeAddress(address);

                if (result) {
                    // Update item with location
                    await collection.updateOne(
                        { _id: item._id },
                        {
                            $set: {
                                location: {
                                    type: 'Point',
                                    coordinates: [result.lng, result.lat]
                                },
                                address: {
                                    formatted: result.formatted,
                                    district: result.district,
                                    state: result.state || item.state,
                                    pincode: result.pincode,
                                },
                                geocoded: true,
                                geocodedAt: new Date(),
                                geocodeSource: 'mapmyindia',
                            }
                        }
                    );

                    successCount++;
                    console.log(`✅ Success: ${item.title} (${result.lat}, ${result.lng})\n`);
                } else {
                    failCount++;
                    failedItems.push({ title: item.title, address });
                    console.log(`❌ Failed: ${item.title} - No results found\n`);
                }

                // Rate limiting
                if (i < items.length - 1) {
                    await sleep(RATE_LIMIT_DELAY);
                }

            } catch (error) {
                failCount++;
                failedItems.push({ title: item.title, address, error: error.message });
                console.log(`❌ Error: ${item.title} - ${error.message}\n`);
            }
        }

        // Summary
        console.log('\n' + '='.repeat(50));
        console.log('✅ Geocoding complete!');
        console.log('='.repeat(50));
        console.log(`Success: ${successCount}`);
        console.log(`Failed: ${failCount}`);

        if (failedItems.length > 0) {
            console.log('\nFailed items:');
            failedItems.forEach(item => {
                console.log(`  - ${item.title}: ${item.address}`);
            });
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        await client.close();
        process.exit(0);
    }
}

// Run
geocodeAllItems();

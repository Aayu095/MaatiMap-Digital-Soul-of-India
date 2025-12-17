/**
 * Check cultural items in MongoDB to see their location data format
 * Run: node scripts/check-items.js
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env' });

async function checkItems() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error('❌ MONGODB_URI not found in .env');
        process.exit(1);
    }

    const client = new MongoClient(uri);

    try {
        console.log('🔗 Connecting to MongoDB...');
        await client.connect();

        const db = client.db('maatimap');
        const collection = db.collection('culturalItems');

        // Get total count
        const total = await collection.countDocuments();
        console.log(`📊 Total items: ${total}\n`);

        // Check items with location
        const withLocation = await collection.countDocuments({ location: { $exists: true, $ne: null } });
        console.log(`✅ Items with location field: ${withLocation}`);

        // Check items without location
        const withoutLocation = await collection.countDocuments({
            $or: [
                { location: { $exists: false } },
                { location: null }
            ]
        });
        console.log(`❌ Items without location field: ${withoutLocation}\n`);

        // Sample a few items to see their structure
        console.log('📋 Sample items:\n');
        const samples = await collection.find().limit(3).toArray();

        samples.forEach((item, index) => {
            console.log(`Item ${index + 1}: ${item.title}`);
            console.log(`  Category: ${item.category}`);
            console.log(`  State: ${item.state || item.region || 'N/A'}`);
            console.log(`  Location field exists: ${!!item.location}`);

            if (item.location) {
                console.log(`  Location type: ${item.location.type || 'N/A'}`);
                console.log(`  Coordinates: ${JSON.stringify(item.location.coordinates)}`);
            } else {
                console.log(`  Has latitude: ${!!item.latitude}`);
                console.log(`  Has longitude: ${!!item.longitude}`);
                if (item.latitude && item.longitude) {
                    console.log(`  Lat/Lng: ${item.latitude}, ${item.longitude}`);
                }
            }
            console.log('');
        });

        // Check if items have latitude/longitude fields instead
        const withLatLng = await collection.countDocuments({
            latitude: { $exists: true },
            longitude: { $exists: true }
        });
        console.log(`📍 Items with latitude/longitude fields: ${withLatLng}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        await client.close();
        process.exit(0);
    }
}

checkItems();

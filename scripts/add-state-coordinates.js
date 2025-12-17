/**
 * Add coordinates based on state capitals for cultural items
 * Since cultural items are art forms/traditions, we'll use state capital coordinates
 * Run: node scripts/add-state-coordinates.js
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env' });

// State capital coordinates
const STATE_COORDINATES = {
    'Odisha': [85.8245, 20.2961], // Bhubaneswar
    'Jharkhand': [85.3096, 23.3441], // Ranchi
    'West Bengal': [88.3639, 22.5726], // Kolkata
    'Gujarat': [72.5714, 23.0225], // Ahmedabad
    'Chhattisgarh': [81.6296, 21.2514], // Raipur
    'Madhya Pradesh': [77.4126, 23.2599], // Bhopal
    'Kerala': [76.2711, 9.9312], // Thiruvananthapuram
    'Punjab': [76.7794, 30.7333], // Chandigarh
    'Uttarakhand': [78.0322, 30.3165], // Dehradun
    'Assam': [91.7362, 26.1445], // Guwahati
    'Tamil Nadu': [80.2707, 13.0827], // Chennai
    'Nagaland': [94.1086, 25.6747], // Kohima
    'Uttar Pradesh': [80.9462, 26.8467], // Lucknow
};

async function addCoordinates() {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        console.error('❌ MONGODB_URI not found in .env');
        process.exit(1);
    }

    const client = new MongoClient(mongoUri);

    try {
        console.log('🔗 Connecting to MongoDB...');
        await client.connect();

        const db = client.db('maatimap');
        const collection = db.collection('culturalItems');

        // Find items without location
        console.log('📍 Finding items without location...');
        const items = await collection.find({
            $or: [
                { location: { $exists: false } },
                { location: null }
            ]
        }).toArray();

        console.log(`Found ${items.length} items\n`);

        let successCount = 0;
        let failCount = 0;

        for (const item of items) {
            const state = item.state || item.region;
            const coords = STATE_COORDINATES[state];

            if (coords) {
                await collection.updateOne(
                    { _id: item._id },
                    {
                        $set: {
                            location: {
                                type: 'Point',
                                coordinates: coords // [lng, lat]
                            },
                            geocoded: true,
                            geocodedAt: new Date(),
                            geocodeSource: 'state-capital',
                        }
                    }
                );

                successCount++;
                console.log(`✅ ${item.title} → ${state} (${coords[1]}, ${coords[0]})`);
            } else {
                failCount++;
                console.log(`❌ ${item.title} → No coordinates for state: ${state}`);
            }
        }

        console.log('\n' + '='.repeat(50));
        console.log('✅ Coordinate assignment complete!');
        console.log('='.repeat(50));
        console.log(`Success: ${successCount}`);
        console.log(`Failed: ${failCount}`);
        console.log(`\nNow test the API:`);
        console.log(`curl "http://localhost:9002/api/cultural-items/nearby?lat=28.6139&lng=77.2090&radius=500000"`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        await client.close();
        process.exit(0);
    }
}

addCoordinates();

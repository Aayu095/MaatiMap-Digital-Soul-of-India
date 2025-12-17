/**
 * Create 2dsphere geospatial index on MongoDB
 * Run: node scripts/create-geo-index.js
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env' });

async function createGeoIndex() {
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

        console.log('📍 Creating 2dsphere geospatial index on location field...');

        // Create 2dsphere index for geospatial queries
        await collection.createIndex({ location: '2dsphere' });

        console.log('✅ Geospatial index created successfully!');
        console.log('');
        console.log('MongoDB is now ready for KNN queries using $near operator.');
        console.log('The nearby API will automatically use this index for fast geospatial searches.');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        await client.close();
        process.exit(0);
    }
}

createGeoIndex();

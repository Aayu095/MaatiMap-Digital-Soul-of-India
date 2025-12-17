/**
 * Check all collections in MongoDB
 * Run: node scripts/check-mongodb-collections.js
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env' });

async function checkCollections() {
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

        // List all collections
        const collections = await db.listCollections().toArray();

        console.log(`\n📊 Found ${collections.length} collections in 'maatimap' database:\n`);

        for (const coll of collections) {
            const collection = db.collection(coll.name);
            const count = await collection.countDocuments();

            console.log(`  📁 ${coll.name}: ${count} documents`);

            // Show sample document structure
            if (count > 0) {
                const sample = await collection.findOne();
                console.log(`     Sample fields: ${Object.keys(sample).join(', ')}`);
            }
            console.log('');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        await client.close();
        process.exit(0);
    }
}

checkCollections();

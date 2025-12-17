/**
 * Simple migration: Copy entries to culturalItems collection
 * Run: node scripts/simple-migrate.js
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env' });

async function migrate() {
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
        const entriesCollection = db.collection('entries');
        const culturalItemsCollection = db.collection('culturalItems');

        // Get all entries
        console.log('📥 Fetching entries...');
        const entries = await entriesCollection.find().toArray();
        console.log(`Found ${entries.length} entries\n`);

        let migratedCount = 0;
        let skippedCount = 0;

        for (const entry of entries) {
            console.log(`Processing: ${entry.title}`);

            // Check if already exists
            const existing = await culturalItemsCollection.findOne({ _id: entry._id });
            if (existing) {
                console.log(`  ⏭️  Already exists\n`);
                skippedCount++;
                continue;
            }

            // Create cultural item
            const culturalItem = {
                _id: entry._id,
                title: entry.title,
                summary: entry.description || entry.title,
                description: entry.description,
                category: entry.category || 'art',
                imageUrl: entry.imageUrl,
                region: entry.region,
                state: entry.region,
                tags: entry.tags || [],
                // Will add location via geocoding
            };

            await culturalItemsCollection.insertOne(culturalItem);
            migratedCount++;
            console.log(`  ✅ Migrated\n`);
        }

        console.log('='.repeat(50));
        console.log('✅ Migration complete!');
        console.log('='.repeat(50));
        console.log(`Migrated: ${migratedCount}`);
        console.log(`Skipped: ${skippedCount}`);
        console.log(`\nNow run: node scripts/geocode-items.js`);
        console.log(`to add location coordinates using MapMyIndia`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        await client.close();
        process.exit(0);
    }
}

migrate();

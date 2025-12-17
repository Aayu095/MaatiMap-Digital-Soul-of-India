/**
 * Migrate cultural data from 'entries' to 'culturalItems' collection
 * and add location coordinates from Firestore data
 * Run: node scripts/migrate-to-cultural-items.js
 */

const { MongoClient } = require('mongodb');
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config({ path: '.env' });

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

const firestore = getFirestore();

async function migrateData() {
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
        console.log('📥 Fetching entries from MongoDB...');
        const entries = await entriesCollection.find().toArray();
        console.log(`Found ${entries.length} entries\n`);

        // Get cultural items from Firestore for location data
        console.log('📥 Fetching cultural items from Firestore...');
        const firestoreSnapshot = await firestore.collection('culturalItems').get();
        const firestoreItems = {};
        firestoreSnapshot.docs.forEach(doc => {
            const data = doc.data();
            firestoreItems[doc.id] = data;
        });
        console.log(`Found ${firestoreSnapshot.size} items in Firestore\n`);

        let migratedCount = 0;
        let skippedCount = 0;

        for (const entry of entries) {
            console.log(`Processing: ${entry.title}`);

            // Check if already exists in culturalItems
            const existing = await culturalItemsCollection.findOne({ _id: entry._id });
            if (existing) {
                console.log(`  ⏭️  Already exists, skipping\n`);
                skippedCount++;
                continue;
            }

            // Try to find matching Firestore item by title
            const firestoreItem = Object.values(firestoreItems).find(
                item => item.title === entry.title
            );

            // Build cultural item document
            const culturalItem = {
                _id: entry._id,
                title: entry.title,
                summary: entry.description || entry.title,
                description: entry.description,
                category: entry.category || 'art',
                imageUrl: entry.imageUrl,
                region: entry.region,
                state: entry.region, // Use region as state for now
                tags: entry.tags || [],
            };

            // Add location if available from Firestore
            if (firestoreItem && firestoreItem.latitude && firestoreItem.longitude) {
                culturalItem.location = {
                    type: 'Point',
                    coordinates: [firestoreItem.longitude, firestoreItem.latitude]
                };
                culturalItem.geocoded = true;
                culturalItem.geocodedAt = new Date();
                culturalItem.geocodeSource = 'firestore';
                console.log(`  ✅ Added location: [${firestoreItem.longitude}, ${firestoreItem.latitude}]`);
            } else {
                console.log(`  ⚠️  No location data available`);
            }

            // Insert into culturalItems
            await culturalItemsCollection.insertOne(culturalItem);
            migratedCount++;
            console.log(`  ✅ Migrated successfully\n`);
        }

        console.log('='.repeat(50));
        console.log('✅ Migration complete!');
        console.log('='.repeat(50));
        console.log(`Migrated: ${migratedCount}`);
        console.log(`Skipped: ${skippedCount}`);
        console.log(`Total in culturalItems: ${await culturalItemsCollection.countDocuments()}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        await client.close();
        process.exit(0);
    }
}

migrateData();

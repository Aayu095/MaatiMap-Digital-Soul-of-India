// src/app/api/get-loot-prizes/route.ts
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || ""; // .env.local mein URI hona chahiye
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const db = client.db("maatimap");
    const collection = db.collection("loot_prizes");

    const prizes = await collection.find().toArray();

    return NextResponse.json(prizes);
  } catch (error) {
    console.error("Failed to fetch prizes:", error);
    return NextResponse.json({ error: "Failed to fetch prizes" }, { status: 500 });
  } finally {
    await client.close();
  }
}

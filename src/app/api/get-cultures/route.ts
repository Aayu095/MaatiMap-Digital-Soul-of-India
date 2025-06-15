import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('maatimap');
    const collection = db.collection('entries');

    const data = await collection.find({}).toArray();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching cultural items:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

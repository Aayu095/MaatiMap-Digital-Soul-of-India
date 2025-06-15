import { GoogleGenerativeAI } from "@google/generative-ai";
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { query } = await request.json();

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('entries');

    // First, get the embedding for the query
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);
    const model = genAI.getGenerativeModel({ model: "embedding-001" });
    const result = await model.embedContent(query);
    const embedding = result.embedding.values;

    // Perform vector search
    const pipeline = [
      {
        $vectorSearch: {
          index: "vector_index", // the name of your index
          path: "embedding",
          queryVector: embedding,
          limit: 5,
          numCandidates: 50
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          score: { $meta: "vectorSearchScore" }
        }
      }
    ];

    const results = await collection.aggregate(pipeline).toArray();

    return NextResponse.json(results);
  } catch (error) {
    console.error('Vector search error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
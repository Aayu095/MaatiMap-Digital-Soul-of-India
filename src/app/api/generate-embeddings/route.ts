import { generateEmbeddingsForCollection } from '@/lib/vectorUtils';
import { NextResponse } from 'next/server';

export async function GET() {
  await generateEmbeddingsForCollection();
  return NextResponse.json({ message: 'Embeddings generated successfully!' });
}
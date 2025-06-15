// lib/vectorUtils.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { WithId, Document } from "mongodb";
import clientPromise from "./mongodb";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);

export async function generateEmbeddingsForCollection() {
  try {
    const client = await clientPromise;
    const db = client.db(); // defaults to the DB in your URI
    const collection = db.collection("entries");

    // Fetch all documents without embeddings
    const entries: WithId<Document>[] = await collection
      .find({ embedding: { $exists: false } })
      .toArray();

    const model = genAI.getGenerativeModel({ model: "embedding-001" });

    for (const entry of entries) {
      const text = entry.description || entry.title || "";

      if (text.trim() === "") continue; // Skip empty documents

      // Generate embedding
      const result = await model.embedContent(text);
      const embedding = result.embedding.values;

      // Update document
      await collection.updateOne(
        { _id: entry._id },
        { $set: { embedding: embedding } }
      );
    }

    console.log(`Updated ${entries.length} entries with embeddings.`);
  } catch (error) {
    console.error("Error generating embeddings:", error);
  }
}

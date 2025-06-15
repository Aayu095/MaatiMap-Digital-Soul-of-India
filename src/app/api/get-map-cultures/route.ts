import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // adjust if your client file path is different

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");

  if (!state) {
    return NextResponse.json({ error: "State parameter is required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("maatimap");
    const collection = db.collection("map_cultures");

    // Match documents where tags include the state name (case-insensitive)
    const cultures = await collection
      .find({
        tags: { $regex: new RegExp(state, "i") }
      })
      .limit(10)
      .toArray();

    const formatted = cultures.map((doc) => ({
      name: doc.name,
      imageUrl: doc.imageUrl || "https://via.placeholder.com/300x200", // fallback
      description: doc.description || "No description available."
    }));

    return NextResponse.json({ cultures: formatted });
  } catch (err) {
    console.error("Error fetching cultures:", err);
    return NextResponse.json({ error: "Failed to fetch cultural data" }, { status: 500 });
  }
}

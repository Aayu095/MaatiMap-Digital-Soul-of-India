import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

const dbName = "maatimap";

const options: MongoClientOptions = {
  maxPoolSize: 10,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 5000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().then((connectedClient) => {
      console.log("MongoDB connected (dev)");
      return connectedClient;
    }).catch((err) => {
      console.error("MongoDB connection error (dev):", err.message);
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then((connectedClient) => {
    console.log("MongoDB connected (prod)");
    return connectedClient;
  }).catch((err) => {
    console.error("MongoDB connection error (prod):", err.message);
    throw err;
  });
}

export default clientPromise;

export async function getDb() {
  const client = await clientPromise;
  return client.db("maatimap"); 
}

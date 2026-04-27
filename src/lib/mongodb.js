import env from "./env";
import { MongoClient, ServerApiVersion } from "mongodb";

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(env.MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function connectCollection(collectionName) {
  const client = await clientPromise;
  const db = client.db(env.DB_NAME);
  return db.collection(collectionName);
}

export const slotsCollection = await connectCollection("slots");

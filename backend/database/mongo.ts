import { MongoClient, Db } from 'mongodb';

const uri = "mongodb+srv://admin:admin@cluster0.cff59.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "car_maintenance";

let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<Db> {
  if (db) return db;

  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Connected to MongoDB");
    db = client.db(dbName);
    return db;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}

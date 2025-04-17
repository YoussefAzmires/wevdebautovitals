import MaintenanceRecord from "../models/maintenanceRecords";
import { connectToDatabase } from "../database/mongo";
import { Collection, MongoError  } from "mongodb";


let maintenanceRecordsCollection: Collection<MaintenanceRecord>;

async function getMaintenanceCollection(): Promise<Collection<MaintenanceRecord>> {
    if (!maintenanceRecordsCollection) {
      const db = await connectToDatabase();
      maintenanceRecordsCollection = db.collection<MaintenanceRecord>('maintenance');
    }
    return maintenanceRecordsCollection;
  }

  export async function addMaintenanceRecord(record: MaintenanceRecord): Promise<MaintenanceRecord> {
    try {
      const collection = await getMaintenanceCollection();
      const result = await collection.insertOne(record);
      console.log("✅ Inserted maintenance record:", result.insertedId);
      return record;
    } catch (err: unknown) {
      if (err instanceof MongoError) {
        console.error("❌ MongoDB error:", err.message);
        throw new Error("Failed to insert maintenance record.");
      } else {
        console.error("❌ Unexpected error:", err);
        throw new Error("Something went wrong while adding the record.");
      }
    }
  }

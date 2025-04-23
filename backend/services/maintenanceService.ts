import MaintenanceRecord from "../models/maintenanceRecords";
import { connectToDatabase } from "../database/mongo";
import { Collection, MongoError } from "mongodb";

let maintenanceRecordsCollection: Collection<MaintenanceRecord>;

/**
 * Retrieves the MongoDB collection for the maintenance records.
 * If the collection has not been initialized yet, it connects to the database
 * and initializes the collection.
 * @returns The MongoDB collection for the maintenance records.
 * @throws {Error} If the initialization fails, either due to a MongoDB error or an unknown error.
 */
async function getMaintenanceCollection(): Promise<
  Collection<MaintenanceRecord>
> {
  if (!maintenanceRecordsCollection) {
    const db = await connectToDatabase();
    maintenanceRecordsCollection =
      db.collection<MaintenanceRecord>("maintenance");
  }
  return maintenanceRecordsCollection;
}

/**
 * Adds a maintenance record to the database. 
 * @param record - The maintenance record to add.
 * @returns The added record.
 * @throws {Error} If the addition fails, either due to a MongoDB error or an unknown error.
 */
export async function addMaintenanceRecord(
  record: MaintenanceRecord
): Promise<MaintenanceRecord> {
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

/**
 * Retrieves a single maintenance record from the database with the given car part.
 * @param carPart - The car part of the record to retrieve.
 * @returns The retrieved record, or null if no record exists with the given car part.
 * @throws {Error} If the retrieval fails, either due to a MongoDB error or an unknown error.
 */
export async function getOneMaintenanceRecord(
  carPart: string
): Promise<MaintenanceRecord | null> {
  try {
    const collection = await getMaintenanceCollection();
    const record = (await collection.findOne({ carPart: carPart })) || null;
    console.log(`Fetched record:`, record);
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



/**
 * Retrieves a list of all maintenance records from the database.
 * @returns A list of all maintenance records in the database.
 * @throws {Error} If the retrieval fails, either due to a MongoDB error or an unknown error.
 */
export async function getAllMaintenanceRecord(): Promise<
  Array<MaintenanceRecord>
> {
  try {
    const collection = await getMaintenanceCollection();
    const records = (await collection.find({})).toArray();
    console.log(`Fetches list of records: ${records}`);
    return records;
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
/**
 * Deletes a single maintenance record from the database with the given car part.
 * @param carPart - The car part of the record to delete.
 * @returns If the record is found and deleted, it returns nothing (void). If no record is found, it returns null.
 * @throws {Error} If the deletion fails, either due to a MongoDB error or an unknown error.
 */

export async function deleteOneMaintenanceRecord(
  carPart: string
): Promise<void | null> {
  try {
    const collection = await getMaintenanceCollection();
    const result = await collection.deleteOne({ carPart: carPart });
    if (result.deletedCount === 0) {
      console.log(`No record found for car part: ${carPart}`);
      return null;
    }

    console.log(`Deleted record for car part: ${carPart}`);
    return;
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
/**
 * Updates a single maintenance record in the database with the given car part.
 * @param carPart - The car part of the record to update.
 * @param record - The new record to update to.
 * @returns The updated record, or null if no record exists with the given car part.
 * @throws {Error} If the update fails, either due to a MongoDB error or an unknown error.
 */

export async function updateOneMaintenanceRecord( carPart: string, record: MaintenanceRecord): Promise<MaintenanceRecord | null> {
  try{
    const collection = await getMaintenanceCollection();
    const result = await collection.findOneAndUpdate({ carPart: carPart }, { $set: record }, { upsert: false });
    return result.value;
  }catch (err: unknown) {
    if (err instanceof MongoError) {
      console.error("❌ MongoDB error:", err.message);
      throw new Error("Failed to insert maintenance record.");
    } else {
      console.error("❌ Unexpected error:", err);
      throw new Error("Something went wrong while adding the record.");
    }
  }
}


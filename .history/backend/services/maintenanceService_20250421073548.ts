import MaintenanceRecord from "../models/maintenanceRecords";
import { connectToDatabase } from "../database/mongo";
import { Collection, MongoError } from "mongodb";

let maintenanceRecordsCollection: Collection<MaintenanceRecord>;

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
// async function deleteOneMaintenanceRecord(carPart: string): Promise<void | null> {
//   checkIfCollectionInitialized();

//   try {
//     const result = await maintenanceCollection.deleteOne({ carPart: carPart });

//     if (result.deletedCount === 0) {
//       console.log(`No record found for car part: ${carPart}`);
//       return null;
//     }

//     console.log(`Deleted record for car part: ${carPart}`);
//     return;

//   } catch (err: unknown) {
//     if (err instanceof MongoError) {
//       console.log(err.message);
//       throw new Error(err.message);
//     } else if (err instanceof Error) {
//       const msg = "Unexpected error occurred in deleteOneMaintenanceRecord: " + err.message;
//       throw new DatabaseError(msg);
//     } else {
//       const msg = "Unknown issue caught in deleteOneMaintenanceRecord. Should not happen";
//       console.error(msg);
//       throw new DatabaseError(msg);
//     }
//   }
// }

// async function updateOneMaintenanceRecord(oldRecord:MaintenanceRecord, newRecord:MaintenanceRecord): Promise<MaintenanceRecord | null> {
//   checkIfCollectionInitialized();
//   try{
//     const result = await maintenanceCollection.findOneAndUpdate(
//       { carPart: oldRecord.carPart, lastChanged: oldRecord.lastChanged, nextChange: oldRecord.nextChange }, // Find by old record
//       { $set: { carPart: newRecord.carPart, lastChanged: newRecord.lastChanged, nextChange: newRecord.nextChange }}, // Set new values record
//       { returnDocument: "after" }
//     );
//     if(!result){
//       return null;
//     }
//     console.log(result);
//     console.log(`Updated record for car part: ${oldRecord.carPart}`);
//     return result
//   }
//   catch (err: unknown) {
//     if (err instanceof MongoError) {
//       console.log(err.message);
//       throw new Error(err.message);
//     } else if (err instanceof Error) {
//       const msg =
//         "Unexpected error occured in addMaintenanceRecord" + err.message;
//       throw new DatabaseError(err.message);
//     } else {
//       const msg =
//         "Unknown issue caught in addMaintenanceRecord. Should not happen";
//       console.error(msg);
//       throw new DatabaseError(msg);
//     }
//   }

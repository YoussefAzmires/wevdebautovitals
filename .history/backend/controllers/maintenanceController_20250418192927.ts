import {Request, Response} from "express";  
import { addMaintenanceRecord, getOneMaintenanceRecord } from "../services/maintenanceService";
import MaintenanceRecord from "../models/maintenanceRecords";
import logger from "../utils/logger";

export async function handleAddMaintenanceRecord(req: Request, res: Response) {

    try{
        const record : MaintenanceRecord = req.body 
        logger.info("Adding maintenance record:", record.carPart);  
        const response = await addMaintenanceRecord(record);
    }catch(err){
        logger.error("Failed to add maintenance record:", err);
        res.status(500).json({error: "Failed to add maintenance record."});
    }
}

export async function handleGetOneMaintenanceRecord(req: Request, res: Response) {

    const carPart = req.params.carPart;

  if (!carPart) {
    return res.status(400).json({ error: "carPart is required" });
  }

  try {
    logger.info("Searching for car part:", carPart);
    const record = await getOneMaintenanceRecord(carPart);
    if (!record) {
      return res.status(404).json({ error: "No record found" });
    }
    res.json(record);
  } catch (err) {
    logger.error("Failed to fetch maintenance record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
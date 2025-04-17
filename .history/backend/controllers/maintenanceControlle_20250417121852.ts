import {Request, Response} from "express";  
import { addMaintenanceRecord } from "../services/maintenanceService";
import MaintenanceRecord from "../models/maintenanceRecords";
import logger from "../utils/logger";

export async function addMaintenanceRecordController(req: Request, res: Response) {

    try{
        const record : MaintenanceRecord = req.body 
        logger.info("Adding maintenance record:", record);  
        const response = await addMaintenanceRecord(record);
    }catch(err){
        logger.error("Failed to add maintenance record:", err);
        res.status(500).json({error: "Failed to add maintenance record."});
    }
}
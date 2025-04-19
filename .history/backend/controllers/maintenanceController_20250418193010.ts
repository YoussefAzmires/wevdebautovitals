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
    if(!carPart){
        res.status(400).json({error: "Missing car part."});
        return;
    }
    try{
        logger.info("Fetching maintenance record for car part:", carPart);  
        const response = await getOneMaintenanceRecord(carPart);
        res.json(response);
    } catch(err){
        logger.error("Failed to fetch maintenance record:", err);
        res.status(500).json({error: "Failed to fetch maintenance record."});
    }
}
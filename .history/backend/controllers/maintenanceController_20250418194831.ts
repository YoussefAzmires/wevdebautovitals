import {Request, Response} from "express";  
import { addMaintenanceRecord, getOneMaintenanceRecord, getAllMaintenanceRecord } from "../services/maintenanceService";
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
        logger.info("searching maintenance record for car part:", carPart);  
        const record = await getOneMaintenanceRecord(carPart);
        if(!record){
            res.status(404).json({error: "Maintenance record not found."});
            return;
        }
        res.json(record);
    } catch(err){
        logger.error("Failed to fetch maintenance record:", err);
        res.status(500).json({error: "Failed to fetch maintenance record."});
    }
}

export async function handleAddMaintenanceRecords(req: Request, res: Response) {
    try{
        logger.info("about to fetch all maintenance records");
        const records = await getAllMaintenanceRecord();
        if(!records){
            res.status(404).json({error: "Maintenance records not found."});
            return;
        }
        res.json(records);
    }catch(err){
        logger.error("Failed to fetch all maintenance records:", err);
        res.status(500).json({error: "Failed to fetch maintenance records."});
    }
}
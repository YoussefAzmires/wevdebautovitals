import {Request, Response} from "express";  
import { addMaintenanceRecord, getOneMaintenanceRecord, getAllMaintenanceRecord, deleteOneMaintenanceRecord} from "../services/maintenanceService";
import MaintenanceRecord from "../models/maintenanceRecords";
import logger from "../utils/logger";

export async function handleAddMaintenanceRecord(req: Request, res: Response) {
    try {
      const record: MaintenanceRecord = req.body;
      logger.info("Adding maintenance record:", record.carPart);  
      const response = await addMaintenanceRecord(record);
  
      res.status(201).json({ message: "Record added successfully", data: response }); 
    } catch (err) {
      logger.error("Failed to add maintenance record:", err);
      res.status(500).json({ error: "Failed to add maintenance record." });
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

export async function handleGetAllMaintenanceRecord(req: Request, res: Response) {
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
        res.status(500).json({error: "Failed to fetch all maintenance records."});
    }
}
export async function handleDeleteOneMaintenanceRecord(req:Request, res: Response){
    try{
        logger.info("deleting maintenance record");
        const carPart = req.params.carPart;
        if(!carPart){
            res.status(400).json({error: "Missing car part."});
            return;
        }
        const response = await deleteOneMaintenanceRecord(carPart);
        res.json(response);
    } catch(err){
        logger.error("Failed to delete maintenance record:", err);
        res.status(500).json({error: "Failed to delete maintenance record."});
    }
}
import {Request, Response} from "express";  
import { addMaintenanceRecord, getOneMaintenanceRecord, getAllMaintenanceRecord, deleteOneMaintenanceRecord, updateOneMaintenanceRecord} from "../services/maintenanceService";
import MaintenanceRecord from "../models/maintenanceRecords";
import logger from "../utils/logger";

/**
 * Handles a request to add a maintenance record.
 *
 * @remarks
 * This endpoint expects the maintenance record to be passed in the request body.
 * The record is validated and saved to the database. If the record is successfully
 * added, the record is returned in the response body with a 201 status code.
 * If the record is not successfully added, an error message is returned in the
 * response body with a 500 status code.
 */

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
/**
 * Handles a request to fetch a maintenance record for a specific car part.
 *
 * @remarks
 * The car part is expected to be passed as a path parameter in the request URL.
 * The service is invoked to fetch the record and if it is found, it is returned
 * in the response body with a 200 status code. If the record is not found, a
 * 404 error is returned with an error message. If any errors occur during the
 * process, a 500 error is returned with an error message.
 */
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

/**
 * Handles the request to retrieve all maintenance records.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * 
 * @remarks
 * This function logs the attempt to fetch all maintenance records,
 * invokes the service to retrieve them, and sends the result back
 * to the client in JSON format. If no records are found, it responds
 * with a 404 error. In case of any errors during the process, it
 * logs the error and responds with a 500 error.
 */

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
/**
 * Handles the request to update a maintenance record for a specific car part.
 * 
 * @param req - The request object containing the car part parameter and the updated record in the body.
 * @param res - The response object used to send the result or error back to the client.
 * 
 * @remarks
 * This function checks for the presence of the car part and record in the request, 
 * logs the attempt, and invokes the service to update the record. If the car part or 
 * record is missing, it responds with a 400 error. If the update is successful, it 
 * sends the updated record back to the client in JSON format. In case of any errors 
 * during the process, it logs the error and responds with a 500 error.
 */

export async function handleUpdateMaintenanceRecord(req:Request, res:Response) {
	try{
        const record :MaintenanceRecord = req.body;
        const carPart = req.params.carPart;
        if(!carPart){
            res.status(400).json({error: "Missing car part."});
            return;
        }
        if(!record){
            res.status(400).json({error: "Missing record to update"})
        }
        const response = await updateOneMaintenanceRecord(carPart, record);
        res.json(response);
    }catch(err){
        logger.error("Failed to update maintenance record:", err);
        res.status(500).json({error: "Failed to update maintenance record."});
    }

}
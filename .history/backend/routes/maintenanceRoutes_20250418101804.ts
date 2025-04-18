import express from 'express';
import { handleAddMaintenanceRecord, handleGetOneMaintenanceRecord } from '../controllers/maintenanceController';
const router = express.Router();

router.post('/', handleAddMaintenanceRecord);
router.get('/maintenance/carpart/:carPart', handleGetOneMaintenanceRecord);
export default router;

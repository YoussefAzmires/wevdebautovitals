import express from 'express';
import { handleAddMaintenanceRecord, handleGetOneMaintenanceRecord } from '../controllers/maintenanceController';
const router = express.Router();

router.post('/', handleAddMaintenanceRecord);
router.get('/carpart/:carPart', handleGetOneMaintenanceRecord);
export default router;

import express from 'express';
import { handleAddMaintenanceRecord } from '../controllers/maintenanceController';
const router = express.Router();

router.post('/', handleAddMaintenanceRecord);

export default router;

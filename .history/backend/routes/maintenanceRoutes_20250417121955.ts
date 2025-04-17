import express from 'express';
import { handleAddMaintenanceRecord } from '../controllers/maintenanceController';

const router = express.Router();

router.post('/add', handleAddMaintenanceRecord);

export default router;

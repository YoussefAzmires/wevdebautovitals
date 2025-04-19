import express from 'express';
import { handleAddMaintenanceRecord, handleGetOneMaintenanceRecord, handleGetAllMaintenanceRecord} from '../controllers/maintenanceController';
const router = express.Router();

router.post('/', handleAddMaintenanceRecord);
router.get('/carpart/:carPart', handleGetOneMaintenanceRecord);
router.get('/', handleGetAllMaintenanceRecord);
export default router;

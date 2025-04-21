import express from 'express';
import { handleAddMaintenanceRecord, handleGetOneMaintenanceRecord, handleGetAllMaintenanceRecord, handleDeleteOneMaintenanceRecord} from '../controllers/maintenanceController';
const router = express.Router();

router.post('/', handleAddMaintenanceRecord);
router.get('/carpart/:carPart', handleGetOneMaintenanceRecord);
router.get('/', handleGetAllMaintenanceRecord);
router.delete('/carpart/:carPart', handleDeleteOneMaintenanceRecord);
export default router;

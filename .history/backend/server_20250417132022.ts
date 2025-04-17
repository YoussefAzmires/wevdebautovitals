import express from 'express';
import logger from './utils/logger';
import maintenanceRoutes from './routes/maintenanceRoutes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); 

app.use('/api/maintenance', maintenanceRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});

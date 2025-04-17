import express from 'express';
import cors from 'cors';
import logger from './utils/logger';
import maintenanceRoutes from './routes/maintenanceRoutes';
import { connectToDatabase } from './database/mongo'; 

const app = express();
const PORT = 3000;

async function startServer() {
  try {
    await connectToDatabase(); 
    logger.info('✅ Connected to MongoDB');

    app.use(cors());
    app.use(express.json());
    app.use('/api/maintenance', maintenanceRoutes);

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error('❌ Failed to start server:', err);
    process.exit(1); 
  }
}

startServer();

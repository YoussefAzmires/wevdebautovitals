import express from 'express';
import logger from './utils/logger.js';

import maintenanceRoutes from './routes/maintenanceRoutes';

const app = express();

app.use(express.json()); 

app.use('/api/maintenance', maintenanceRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});

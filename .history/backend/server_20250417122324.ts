import express from 'express';
import maintenanceRoutes from './routes/maintenanceRoutes';

const app = express();

app.use(express.json()); // to parse JSON bodies

// 🔥 This is where you "call" your router
app.use('/api/maintenance', maintenanceRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

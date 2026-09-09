import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { initDatabase } from './db/database.js';
import { seedDatabaseIfNeeded } from './db/seed.js';

import authRoutes from './routes/auth.routes.js';
import departmentRoutes from './routes/departments.routes.ts';
import doctorRoutes from './routes/doctors.routes.ts';
import appointmentRoutes from './routes/appointments.routes.ts';
import facilityRoutes from './routes/facilities.routes.ts';
import hospitalRoutes from './routes/hospital.routes.ts';
import adminRoutes from './routes/admin.routes.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/admin', adminRoutes);

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), hospital: 'St. Jude Memorial Hospital' });
});

// Initialize database and start server
async function startServer() {
  try {
    await initDatabase();
    await seedDatabaseIfNeeded();

    app.listen(Number(PORT), '127.0.0.1', () => {
      console.log(`🏥 St. Jude Hospital Backend Server running on http://127.0.0.1:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();

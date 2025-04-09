import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Student from './models/Student.js';
import Worker from './models/Worker.js';
import Admin from './models/Admin.js';
import Complaint from './models/Complaint.js';
import router from './routes/authRoutes.js';
import connectDB from './config/db.js';
import complaintrouter from './routes/complaintRoutes.js';
import workerRoutes from './routes/workerRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';


// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/auth', router);
app.use('/api/complaints', complaintrouter);
app.use('/api/admin/workers', workerRoutes);
app.use('/api/dashboard', dashboardRoutes);


// Health check endpoint
app.get('/', (req, res) => {
  res.send('Hostel Mate API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
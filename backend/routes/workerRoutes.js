// routes/workerRoutes.js
import express from 'express';
import { addWorker,getAllWorkers, deleteWorker } from '../controllers/workerController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const workerRoutes = express.Router();

workerRoutes.post('/add', protect, isAdmin, addWorker);
workerRoutes.get('/', protect, isAdmin, getAllWorkers);          // GET /api/workers
workerRoutes.delete('/:id', protect, isAdmin, deleteWorker);     // DELETE /api/workers/:id

export default workerRoutes;

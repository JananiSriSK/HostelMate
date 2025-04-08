import express from 'express';
import { createComplaint, getStudentComplaints , getWorkerComplaints, getPendingComplaints, getResolvedComplaints, getStalePendingComplaints} from '../controllers/complaintController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';


const complaintrouter = express.Router();


complaintrouter.post('/', protect, createComplaint);
complaintrouter.get('/my', protect, getStudentComplaints);


complaintrouter.get('/pending', protect, isAdmin, getPendingComplaints);
complaintrouter.get('/resolved', protect, isAdmin, getResolvedComplaints);
complaintrouter.get('/pending-stale', protect, isAdmin, getStalePendingComplaints);



complaintrouter.get('/worker', protect, getWorkerComplaints);


export default complaintrouter;

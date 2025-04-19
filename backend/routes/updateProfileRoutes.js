import express from 'express';
import { updateStudentProfile, updateWorkerProfile } from '../controllers/updateProfileController.js';
import { protect } from '../middleware/authMiddleware.js';

const updateRouter = express.Router();

updateRouter.put('/student/:id',protect,updateStudentProfile);
updateRouter.put('/worker/:id',protect,updateWorkerProfile);

export default updateRouter;

import express from 'express';
import { studentSignup, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', studentSignup); // Only for students
router.post('/signin', login);         // For students and workers

export default router;

import express from 'express';
import { getAllUsers, deleteUser } from '../middleware/models/controllers/adminController.js';
import authMiddleware, { adminMiddleware } from '../../../../auth.js';

const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:userId', authMiddleware, adminMiddleware, deleteUser);

export default router;

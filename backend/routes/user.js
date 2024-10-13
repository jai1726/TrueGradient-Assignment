import express from 'express';
import { saveResponse, getUserDetails, updateUser } from '../middleware/models/controllers/userController.js';
import authMiddleware from '../../../../auth.js';

const router = express.Router();

router.post('/responses', authMiddleware, saveResponse);
router.get('/me', authMiddleware, getUserDetails);
router.put('/me', authMiddleware, updateUser);

export default router;

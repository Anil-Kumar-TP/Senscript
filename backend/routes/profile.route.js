import express from 'express';
import { verifyUser } from '../utils/verifyToken.js';
import { getProfile } from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/profile', verifyUser, getProfile);

export default router;
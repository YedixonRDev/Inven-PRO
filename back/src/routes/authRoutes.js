// authRoutes.js
import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/v1/registeruser-app/register', register);
router.post('/v1/registeruser-app/login', login);

export default router;

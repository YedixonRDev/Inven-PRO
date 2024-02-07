// userRoutes.js
import express from 'express';
import { deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

router.get('/v1/registeruser-app/users', authenticateToken, getUsers);
router.get('/v1/registeruser-app/users/:id', authenticateToken, getUserById);
router.put('/v1/registeruser-app/users/:id', authenticateToken, updateUser);
router.delete('/v1/registeruser-app/users/:id', authenticateToken, deleteUser);

export default router;

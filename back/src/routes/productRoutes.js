import express from 'express';
import { deleteProduct, getProductById, registerProduct, updateProduct } from '../controllers/productController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

router.post('/v1/inventory-app/products', authenticateToken, registerProduct); 
router.get('/v1/inventory-app/products/:id', authenticateToken, getProductById); 
router.put('/v1/inventory-app/products/:id', authenticateToken, updateProduct); 
router.delete('/v1/inventory-app/products/:id', authenticateToken, deleteProduct); 

export default router;

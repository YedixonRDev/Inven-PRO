import express from 'express';
import { deleteProduct, getProductById, registerProduct, updateProduct } from '../controllers/productController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

router.post('/v1/inventory-app/products', authenticateToken, registerProduct); // Ruta para registrar un nuevo producto
router.get('/v1/inventory-app/products/:id', authenticateToken, getProductById); // Ruta para obtener un producto por ID
router.put('/v1/inventory-app/products/:id', authenticateToken, updateProduct); // Ruta para actualizar un producto por ID
router.delete('/v1/inventory-app/products/:id', authenticateToken, deleteProduct); // Ruta para eliminar un producto por ID

export default router;

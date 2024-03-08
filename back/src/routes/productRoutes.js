import express from 'express';
import { deleteProduct, getProductById, registerProduct, updateProduct } from '../controllers/productController.js'; // Importar las funciones de controlador adecuadas
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

router.post('/v1/inventory-app/products', authenticateToken, registerProduct); // Utiliza registerProduct para manejar la solicitud POST de registro de productos
router.get('/v1/inventory-app/products/:id', authenticateToken, getProductById); // Utiliza getProductById para manejar la solicitud GET de obtener producto por ID
router.put('/v1/inventory-app/products/:id', authenticateToken, updateProduct); // Utiliza updateProduct para manejar la solicitud PUT de actualizar producto por ID
router.delete('/v1/inventory-app/products/:id', authenticateToken, deleteProduct); // Utiliza deleteProduct para manejar la solicitud DELETE de eliminar producto por ID

export default router;

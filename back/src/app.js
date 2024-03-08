import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware para procesar datos JSON
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', productRoutes);

export default app;

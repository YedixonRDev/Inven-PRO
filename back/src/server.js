import cors from 'cors';
import express from 'express';
import path from 'path';
import authenticateToken from './middlewares/authenticateToken.js';
import User from './models/userModel.js';

const app = express();

app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', authenticateToken, async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la lista de usuarios' });
    }
});

const port = 3001;

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});

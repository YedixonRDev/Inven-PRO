import app from './app.js';
import connectDB from './db.js';

connectDB();

app.listen(3001, () => {
    console.log('Servidor iniciado en el puerto 3001');
});

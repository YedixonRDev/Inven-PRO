import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
    try {
        console.log('Configuración de MongoDB:', config.mongoURI);
        await mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Conexión exitosa de MongoDB');
    } catch (error) {
        console.error(`Error al conectar con MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;

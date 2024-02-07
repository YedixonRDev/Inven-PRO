import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const createUser = async (email, password) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Ya existe un usuario con el mismo correo');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        return newUser;
    } catch (error) {
        console.error(error);
        throw new Error('Ha ocurrido un error al crear el usuario');
    }
};

export const getUserByEmailAndPassword = async (email, password) => {
    try {
        // Buscar usuario por su correo electrónico
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        // Verificar si la contraseña es correcta
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas');
        }

        return user;

    } catch (error) {
        console.error(error);
        throw new Error('Ha ocurrido un error al obtener el usuario');
    }
};


import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import userService from './userService.js';

const register = async ({ email, password }) => {
    //Verificar si el usuario existe
    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    //Crear el nuevo usuario 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userService.createUser(email,hashedPassword);

    //Generar el token para el nuevo usuario 
    const token = jwt.sign({ id: newUser.id }, config.secretkey);

    return token;
};

const login = async ({ email, password })=> {
    //Verificar si el usuario exite
    const user = await userService.getUserByEmail(email);

    if (!user) {
        throw new Error ('Credenciales invalidas');
    }

    //Verificar si la contrase;a es correcta
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Credenciales invalidas');

    }

    //Generar el token del usuario   
    const token = jwt.sign({ id: user.id }, config.secretkey);

    return token;

};

export default { register, login };

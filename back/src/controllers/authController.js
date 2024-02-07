import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/userModel.js';

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePasswordStrength = (password) => {

    return password.length >= 8;
};

export const register = async (req, res) => { 
    try {
        const { email, password } = req.body;

        // Validación de correo electrónico
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'El formato del correo electrónico no es válido.' });
        }

        // Validación de contraseña
        if (!validatePasswordStrength(password)) {
            return res.status(400).json({ message: 'La contraseña no cumple con los requisitos mínimos de seguridad.' });
        }

        // Verificar si el usuario ya existe con el mismo correo
        const existingUser = await User.findOne({ email }); 
        if (existingUser) {
            return res.status(400).json({ message: 'Ya existe un usuario con el mismo correo.' });
        }

        // Crear un nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        // Generar un token de acceso
        const accessToken = jwt.sign({ userId: newUser._id }, config.secretKey); 

        // Enviar respuesta
        res.status(201).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al registrar el usuario' });
    }
};

export const login = async (req, res) => { 
    try {
        const { email, password } = req.body;

        // Verificar si el correo y contraseña son correctos
        const user = await User.findOne({ email });
        if (!user) { 
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar un token de acceso
        const accessToken = jwt.sign({ userId: user.id }, config.secretKey); 

        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Autenticación exitosa', accessToken });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al iniciar sesión' });
    }
       
};
export const logout = async (req, res) => {
    try {
        
        res.status(200).json({ message: 'Cierre de sesión exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
};

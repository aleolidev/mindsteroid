import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import {} from 'dotenv/config';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: 'No existe ningún usuario con este correo electrónico.' })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'La contraseña es incorrecta.' })

        const token = jwt.sign({ email: existingUser, id: existingUser._id }, process.env.PASSWORD_HASH);

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Algo salió mal.' })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, isGoogleAccount, googleId, imageUrl } = req.body;
    let hashedPassword = password;

    try {
        const existingUser = await User.findOne({ email });
        
        if (existingUser) return res.status(400).json({ message: 'Ya existe un usuario con este correo electrónico.' })
        
        if (password !== confirmPassword) return res.status(400).json({ message: 'Las contraseñas no coinciden.' })

        if (password !== null && password !== undefined && password !== '' &&
            confirmPassword !== null && confirmPassword !== undefined && confirmPassword !== '') {
            hashedPassword = await bcrypt.hash(password, 12);
        }
        
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, isGoogleAccount, googleId, imageUrl });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.PASSWORD_HASH);

        res.status(200).json({ result, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Algo salió mal.' })
    }
}

export const getUserByGoogleId = async (req, res) => {
    const { googleId } = req.params;
    
    try {
        const existingUser = await User.findOne({ googleId });

        if (existingUser) return res.status(200).json({ result: existingUser })
        return res.status(200).json({ result: null })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Algo salió mal.' })
    }
}

export const getUserByEmail = async (req, res) => {
    const { email } = req.params;
    
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(200).json({ result: existingUser })
        return res.status(200).json({ result: null })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Algo salió mal.' })
    }
}
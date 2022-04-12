import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import {} from 'dotenv/config';
import { Card, Deck } from '../models/models.js';

// Login / Register

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

        if (!isGoogleAccount && (password === null || password === undefined || password.length < 8) ) 
            return res.status(400).json({ message: 'La contraseña es demasiado corta.' })

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

// Studying status

export const getReviewCardsById = async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.id);

        if ((deck) && (req.userobjectid !== deck.creator.toString()))
            return res.status(403).json({ message: "No tienes permisos para acceder a este contenido "})

        const cardset = await Card.find({ "_id": { "$in": deck.cardset}});

        const user = await User.find({ "_id": req.userobjectid }).lean()

        const deckData = user[0].progress.filter(
            deck => deck._id.toString() == req.params.id
        )[0]?.cardset
        
        let cardsToRemove = deckData?.filter(
            card => card.status == 'Easy' 
        )

        let cardDifference;

        if (cardsToRemove && cardsToRemove.length > 0) {
            cardDifference = cardset.filter(card1 => 
                !cardsToRemove.some(card2 => card1._id.toString() == card2._id.toString()))
        } else {
            cardDifference = cardset;
        }     

        res.status(200).json({ ...cardDifference });
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message });
    }
}

export const getTestCardsById = async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.id);

        if ((deck) && (req.userobjectid !== deck.creator.toString()))
            return res.status(403).json({ message: "No tienes permisos para acceder a este contenido "})

        const cardset = await Card.find({ "_id": { "$in": deck.cardset}});

        if (cardset)    
            return res.status(200).json({ ...cardset });
        res.status(404).json({ message: "No se encontró el mazo"})
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message });
    }
}

export const setOrUpdateCardStatus = async (req, res) => {
    const data = req.body;

    try {
        const user = await User.findOne({ "_id": req.userobjectid }) 
        let progress = user.progress;
        
        if (!user) 
            return res.status(404).json({ message: 'Unexpected error' });

        const deck = progress.filter(cardset => cardset._id == data._id)
        
        if (!deck || deck.length == 0) 
        {
            const result = await User.findOneAndUpdate({
                '_id': req.userobjectid,
            }, {
                $push: { 'progress': data }
            }, {
                new: true
            })
            
            let updatedCardset = result?.progress?.filter(deck => deck._id == data._id)
            updatedCardset = updatedCardset[0]?.cardset

            if (!updatedCardset)        
                return res.status(404).json({ message: 'Unexpected error' });
            return res.status(200).json({ ...updatedCardset });
        }

        const card = deck[0]?.cardset?.filter(c => c._id == data.cardset[0]._id)

        if (!card || card.length == 0) {
            const result = await User.findOneAndUpdate({
                '_id': req.userobjectid,
            }, {
                $push: { 'progress.$[cardset].cardset': data.cardset[0] }
            }, {
                arrayFilters: [{
                    'cardset._id': data._id
                }],
                new: true
            })
            
            let updatedCardset = result?.progress?.filter(deck => deck._id == data._id)
            updatedCardset = updatedCardset[0]?.cardset

            if (!updatedCardset)        
                return res.status(404).json({ message: 'Unexpected error' });
            return res.status(200).json({ ...updatedCardset });
        }

        const result = await User.findOneAndUpdate({
            '_id': req.userobjectid,
        }, {
            $set: { 'progress.$[cardset].cardset.$[card]': data.cardset[0] }
        }, {
            arrayFilters: [{
                'cardset._id': data._id
            }, {
                'card._id': data.cardset[0]._id
            }],
            new: true
        })
        
        let updatedCardset = result?.progress?.filter(deck => deck._id == data._id)
        updatedCardset = updatedCardset[0]?.cardset

        if (!updatedCardset)        
            return res.status(404).json({ message: 'Unexpected error' });
        return res.status(200).json({ ...updatedCardset });
        
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message });        
    }
}
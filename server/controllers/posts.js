
import Deck from '../models/postDeck.js';

export const getPosts = async (req, res) => {
    try {
        const postDeck = await Deck.find();

        res.status(200).json(postDeck);
    } catch (error) {
        res.status(404).json({ message: error.mesage });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newDeck = new Deck(post);

    try {
        await newDeck.save();

        res.status(201).json(newDeck);
    } catch (error) {
        res.status(409).json({ message: error.mesage });
    }
} 
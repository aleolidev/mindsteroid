
import mongoose from 'mongoose';
import Deck from '../models/postDeck.js';

export const getDecks = async (req, res) => {
    try {
        const postDeck = await Deck.find();

        res.status(200).json(postDeck);
    } catch (error) {
        res.status(404).json({ message: error.mesage });
    }
}

export const getFolderById = async (req, res) => {
    try {
        const postFolder = await Deck.findById(req.params.id);

        res.status(200).json(postFolder);
    } catch (error) {
        res.status(404).json({ message: error.mesage });
    }
}

export const getFoldersById = async (req, res) => {
    try {
        const postFolder = await Deck.findById(req.params.id);

        let subfolders = await Deck.find({ "_id": { "$in": postFolder.subfolders}});

        res.status(200).json(subfolders);
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

export const updateFolder = async (req, res) => {
    const { id: _id } = req.params;
    const folder = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedFolder = await Deck.findByIdAndUpdate(_id, folder, { new: true });

    res.json(updatedFolder);
}
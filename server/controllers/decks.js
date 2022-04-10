
import mongoose from 'mongoose';
import { Deck, Folder } from '../models/models.js';

export const getDecks = async (req, res) => {
    try {
        const postDeck = await Deck.find({ "creator": req.userobjectid});

        res.status(200).json(postDeck);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDeckById = async (req, res) => {
    try {
        const postDeck = await Deck.findById(req.params.id);

        if ((postDeck) && (req.userobjectid !== postDeck.creator.toString()))
            return res.status(403).json({ message: "No tienes permisos para acceder a este contenido "})

        res.status(200).json(postDeck);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getDecksById = async (req, res) => {
    try {
        const postDeck = await Folder.findById(req.params.id);

        if ((postDeck) && (req.userobjectid !== postDeck.creator.toString()))
            return res.status(403).json({ message: "No tienes permisos para acceder a este contenido "})

        let subdecks = await Deck.find({ "_id": { "$in": postDeck.subdecks}});

        res.status(200).json(subdecks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createDeck = async (req, res) => {
    const post = req.body;

    const newDeck = new Deck(post);

    try {
        await newDeck.save();

        res.status(201).json(newDeck);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateDeck = async (req, res) => {
    const { id: _id } = req.params;
    const deck = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No deck with that id');

    const postDeck = await Folder.findById(req.params.id);

    if ((postDeck) && (req.userobjectid !== postDeck.creator.toString()))
        return res.status(403).json({ message: "No tienes permisos para acceder a este contenido "})

    const updatedDeck = await Deck.findByIdAndUpdate(_id, deck, { new: true });

    res.json(updatedDeck);
}

export const deleteDeck = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No deck with that id');

    const postDeck = await Folder.findById(req.params.id);

    if ((postDeck) && (req.userobjectid !== postDeck.creator.toString()))
        return res.status(403).json({ message: "No tienes permisos para acceder a este contenido "})

    let parentId = await Deck.findById(id);
    parentId = parentId.parent.toString();

    // Remove the ObjectId from the parent's subdeck array
    await Folder.findOneAndUpdate({ _id: parentId }, { 
        $pull: { subdecks: id } 
    })

    await Deck.findByIdAndRemove(id);

    res.json({ message: 'Deck deleted successfully' });
}
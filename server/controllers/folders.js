
import mongoose from 'mongoose';
import { Folder } from '../models/models.js';

export const getFolders = async (req, res) => {
    try {
        const postFolder = await Folder.find({ "creator": req.userobjectid});

        res.status(200).json(postFolder);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getFolderById = async (req, res) => {
    try {
        const postFolder = await Folder.findById(req.params.id);

        if ((postFolder) && (req.userobjectid !== postFolder.creator.toString()))
            return res.status(403).json({ message: "No tienes permisos para acceder a este contenido "})

        res.status(200).json(postFolder);
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message });
    }
}

export const getFoldersById = async (req, res) => {
    try {

        const postFolder = await Folder.findById(req.params.id);

        if ((postFolder) && (req.userobjectid !== postFolder.creator.toString()))
            return res.status(403).json({ message: "No tienes permisos para acceder a este contenido "})

        let subfolders = await Folder.find({ "_id": { "$in": postFolder.subfolders}});

        res.status(200).json(subfolders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newFolder = new Folder(post);

    try {
        await newFolder.save();

        res.status(201).json(newFolder);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateFolder = async (req, res) => {
    const { id: _id } = req.params;
    const folder = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No folder with that id');

    const postFolder = await Folder.findById(req.params.id);

    if ((postFolder) && (req.userobjectid !== postFolder.creator.toString()))
        return res.status(403).json({ message: "No tienes permisos para acceder a este contenido "})

    const updatedFolder = await Folder.findByIdAndUpdate(_id, folder, { new: true });

    res.json(updatedFolder);
}

export const deleteFolder = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No folder with that id');

    const postFolder = await Folder.findById(req.params.id);

    if ((postFolder) && (req.userobjectid !== postFolder.creator.toString()))
        return res.status(403).json({ message: "No tienes permisos para acceder a este contenido "})

    let parentId = await Folder.findById(id);
    parentId = parentId.parent.toString();

    // Remove the ObjectId from the parent's subfolder array
    await Folder.findOneAndUpdate({ _id: parentId }, { 
        $pull: { subfolders: id } 
    })

    await Folder.findByIdAndRemove(id);

    res.json({ message: 'Folder deleted successfully' });
}
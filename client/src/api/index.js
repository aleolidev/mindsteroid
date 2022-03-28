import axios from 'axios';

const url = 'http://localhost:5000/decks';
const folderUrl = 'http://localhost:5000/folder';
const foldersUrl = 'http://localhost:5000/folders';

export const fetchDecks = () => axios.get(url);
export const fetchDecksById = (id) => axios.get(`${foldersUrl}/${id}`)
export const fetchPosts = () => axios.get(url);
export const createDeck = (newDeck) => axios.post(url, newDeck);
export const getFolderById = (id) => axios.get(`${folderUrl}/${id}`);
export const updateFolder = (id, updatedFolder) => axios.patch(`${folderUrl}/${id}`, updatedFolder);
export const deleteFolder = (id) => axios.delete(`${folderUrl}/${id}`);
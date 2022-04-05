import axios from 'axios';

const cardUrl = 'http://localhost:5000/card';
const cardsUrl = 'http://localhost:5000/cards';
const folderUrl = 'http://localhost:5000/folder';
const foldersUrl = 'http://localhost:5000/folders';
const deckUrl = 'http://localhost:5000/deck';
const decksUrl = 'http://localhost:5000/decks';

export const getFolderById = (id) => axios.get(`${folderUrl}/${id}`);
export const updateFolder = (id, updatedFolder) => axios.patch(`${folderUrl}/${id}`, updatedFolder);
export const deleteFolder = (id) => axios.delete(`${folderUrl}/${id}`);

export const fetchFolders = () => axios.get(foldersUrl);
export const createFolder = (newFolder) => axios.post(foldersUrl, newFolder);
export const fetchFoldersById = (id) => axios.get(`${foldersUrl}/${id}`)

export const getDeckById = (id) => axios.get(`${deckUrl}/${id}`);
export const updateDeck = (id, updatedDeck) => axios.patch(`${deckUrl}/${id}`, updatedDeck);
export const deleteDeck = (id) => axios.delete(`${deckUrl}/${id}`);

export const fetchDecks = () => axios.get(decksUrl);
export const createDeck = (newDeck) => axios.post(decksUrl, newDeck);
export const fetchDecksById = (id) => axios.get(`${decksUrl}/${id}`)

export const getCardById = (id) => axios.get(`${cardUrl}/${id}`);
export const updateCard = (id, updatedCard) => axios.patch(`${cardUrl}/${id}`, updatedCard);
export const deleteCard = (id) => axios.delete(`${cardUrl}/${id}`);

export const fetchCards = () => axios.get(cardsUrl);
export const createCard = (newCard) => axios.post(cardsUrl, newCard);
export const fetchCardsById = (id) => axios.get(`${cardsUrl}/${id}`)
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

const cardUrl = '/card';
const cardsUrl = '/cards';
const folderUrl = '/folder';
const foldersUrl = '/folders';
const deckUrl = '/deck';
const decksUrl = '/decks';

const authUrl = '/user';

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        req.headers.userObjectId = JSON.parse(localStorage.getItem('profile'))?.result?._id;
    }
  
    return req;
});

export const getFolderById = (id) => API.get(`${folderUrl}/${id}`);
export const updateFolder = (id, updatedFolder) => API.patch(`${folderUrl}/${id}`, updatedFolder);
export const deleteFolder = (id) => API.delete(`${folderUrl}/${id}`);

export const fetchFolders = () => API.get(foldersUrl);
export const createFolder = (newFolder) => API.post(foldersUrl, newFolder);
export const fetchFoldersById = (id) => API.get(`${foldersUrl}/${id}`)

export const getDeckById = (id) => API.get(`${deckUrl}/${id}`);
export const updateDeck = (id, updatedDeck) => API.patch(`${deckUrl}/${id}`, updatedDeck);
export const deleteDeck = (id) => API.delete(`${deckUrl}/${id}`);

export const fetchDecks = () => API.get(decksUrl);
export const createDeck = (newDeck) => API.post(decksUrl, newDeck);
export const fetchDecksById = (id) => API.get(`${decksUrl}/${id}`)

export const getCardById = (id) => API.get(`${cardUrl}/${id}`);
export const updateCard = (id, updatedCard) => API.patch(`${cardUrl}/${id}`, updatedCard);
export const deleteCard = (id) => API.delete(`${cardUrl}/${id}`);

export const fetchCards = () => API.get(cardsUrl);
export const createCard = (newCard) => API.post(cardsUrl, newCard);
export const fetchCardsById = (id) => API.get(`${cardsUrl}/${id}`)

export const signIn = (formData) => API.post(`${authUrl}/signin`, formData).catch(error => {throw error});
export const signUp = (formData) => API.post(`${authUrl}/signup`, formData).catch(error => {throw error});
export const getUserByGoogleId = (googleId) => API.get(`${authUrl}/${googleId}`);
export const getUserByEmail = (email) => API.get(`${authUrl}/get/${email}`);

export const getReviewCardsById = (id) => API.get(`${authUrl}/review-cards/${id}`)
export const getTestCardsById = (id) => API.get(`${authUrl}/test-cards/${id}`)
export const setOrUpdateCardStatus = (data) => API.post(`${authUrl}/card`, data)
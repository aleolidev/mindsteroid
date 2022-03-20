import axios from 'axios';

const url = 'http://localhost:5000/decks';

export const fetchDecks = () => axios.get(url);
export const fetchPosts = () => axios.get(url);
export const createDeck = (newDeck) => axios.post(url, newDeck);
import express from 'express';

import { getDecks, getDecksById, createDeck } from '../controllers/decks.js';

const router = express.Router();

router.post('/', createDeck);
router.get('/', getDecks);
router.get('/:id', getDecksById);

export default router;
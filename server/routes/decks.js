import express from 'express';
import auth from '../middleware/auth.js';

import { getDecks, getDecksById, createDeck } from '../controllers/decks.js';

const router = express.Router();

router.post('/', auth, createDeck);
router.get('/', auth, getDecks);
router.get('/:id', auth, getDecksById);

export default router;
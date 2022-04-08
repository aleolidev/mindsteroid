import express from 'express';
import auth from '../middleware/auth.js';

import { getDeckById, updateDeck, deleteDeck } from '../controllers/decks.js';

const router = express.Router();

router.get('/:id', auth, getDeckById);
router.patch('/:id', auth, updateDeck);
router.delete('/:id', auth, deleteDeck);

export default router;
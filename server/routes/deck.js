import express from 'express';

import { getDeckById, updateDeck, deleteDeck } from '../controllers/decks.js';

const router = express.Router();

router.get('/:id', getDeckById);
router.patch('/:id', updateDeck);
router.delete('/:id', deleteDeck);

export default router;
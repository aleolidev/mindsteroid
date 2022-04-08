import express from 'express';
import auth from '../middleware/auth.js';

import { getCards, getCardsById, createCard } from '../controllers/cards.js';

const router = express.Router();

router.post('/', auth, createCard);
router.get('/', getCards);
router.get('/:id', getCardsById);

export default router;
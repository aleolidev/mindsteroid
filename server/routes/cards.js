import express from 'express';

import { getCards, getCardsById, createCard } from '../controllers/cards.js';

const router = express.Router();

router.post('/', createCard);
router.get('/', getCards);
router.get('/:id', getCardsById);

export default router;
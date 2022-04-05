import express from 'express';

import { getCardById, updateCard, deleteCard } from '../controllers/cards.js';

const router = express.Router();

router.get('/:id', getCardById);
router.patch('/:id', updateCard);
router.delete('/:id', deleteCard);

export default router;
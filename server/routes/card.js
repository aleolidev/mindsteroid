import express from 'express';
import auth from '../middleware/auth.js';

import { getCardById, updateCard, deleteCard } from '../controllers/cards.js';

const router = express.Router();

router.get('/:id', getCardById);
router.patch('/:id', auth, updateCard);
router.delete('/:id', auth, deleteCard);

export default router;
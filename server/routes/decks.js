import express from 'express';

import { getDecks, createPost } from '../controllers/decks.js';

const router = express.Router();

router.get('/', getDecks);
router.post('/', createPost);

export default router;
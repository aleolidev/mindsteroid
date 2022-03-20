import express from 'express';

import { getFoldersById, updateFolder } from '../controllers/decks.js';

const router = express.Router();

router.get('/:id', getFoldersById);

export default router;
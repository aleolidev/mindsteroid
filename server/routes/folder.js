import express from 'express';

import { getFolderById, updateFolder } from '../controllers/decks.js';

const router = express.Router();

router.get('/:id', getFolderById);
router.patch('/:id', updateFolder);

export default router;
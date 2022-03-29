import express from 'express';

import { createPost, getFolders, getFoldersById } from '../controllers/folders.js';

const router = express.Router();

router.post('/', createPost);
router.get('/', getFolders);
router.get('/:id', getFoldersById);

export default router;
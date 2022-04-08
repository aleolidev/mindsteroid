import express from 'express';
import auth from '../middleware/auth.js';

import { createPost, getFolders, getFoldersById } from '../controllers/folders.js';

const router = express.Router();

router.post('/', auth, createPost);
router.get('/', auth, getFolders);
router.get('/:id', auth, getFoldersById);

export default router;
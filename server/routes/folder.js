import express from 'express';
import auth from '../middleware/auth.js';

import { getFolderById, updateFolder, deleteFolder } from '../controllers/folders.js';

const router = express.Router();

router.get('/:id', auth, getFolderById);
router.patch('/:id', auth, updateFolder);
router.delete('/:id', auth, deleteFolder);

export default router;
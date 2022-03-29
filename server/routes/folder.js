import express from 'express';

import { getFolderById, updateFolder, deleteFolder } from '../controllers/folders.js';

const router = express.Router();

router.get('/:id', getFolderById);
router.patch('/:id', updateFolder);
router.delete('/:id', deleteFolder);

export default router;
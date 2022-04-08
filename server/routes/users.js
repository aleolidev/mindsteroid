import express from 'express';

import { getUserByEmail, getUserByGoogleId, signin, signup } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/:googleId', getUserByGoogleId);
router.get('/get/:email', getUserByEmail)

export default router;
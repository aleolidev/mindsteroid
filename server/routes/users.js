import express from 'express';

import { getReviewCardsById, getTestCardsById, getUserByEmail, getUserByGoogleId, setOrUpdateCardStatus, signin, signup } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Login / Register
router.post('/signin', signin);
router.post('/signup', signup);
router.get('/:googleId', getUserByGoogleId);
router.get('/get/:email', getUserByEmail)

// Studying status
router.get('/review-cards/:id', auth, getReviewCardsById)
router.get('/test-cards/:id', auth, getTestCardsById)

router.post('/card', auth, setOrUpdateCardStatus)

export default router;
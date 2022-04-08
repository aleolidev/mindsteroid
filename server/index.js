import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import cardRoutes from './routes/card.js';
import cardsRoutes from './routes/cards.js';
import deckRoutes from './routes/deck.js';
import decksRoutes from './routes/decks.js';
import folderRoutes from './routes/folder.js';
import foldersRoutes from './routes/folders.js';

import userRoutes from './routes/users.js';

import {} from 'dotenv/config';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/card', cardRoutes);
app.use('/cards', cardsRoutes);
app.use('/folder', folderRoutes);
app.use('/folders', foldersRoutes);
app.use('/deck', deckRoutes);
app.use('/decks', decksRoutes);

app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);
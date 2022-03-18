import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
    question: String,
    answer: String,
});

const handSchema = mongoose.Schema({
    name: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    cardSet: [cardSchema],
});

const deckSchema = mongoose.Schema({
    name: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    handSet: [handSchema],
});

const Deck = mongoose.model('Deck', deckSchema);

export default Deck;
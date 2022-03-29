import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
    question: String,
    answer: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
});

const handSchema = mongoose.Schema({
    name: String,
    creator: String,
    cardSet: [cardSchema],
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
});

const deckSchema = mongoose.Schema({
    name: String,
    creator: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    subfolders: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'deckSchema'
        }],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
});

const Deck = mongoose.model('Deck', deckSchema);

export default Deck;
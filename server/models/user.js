import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    isGoogleAccount: { type: Boolean, required: true},
    googleId: { type: String },
    imageUrl: { type: String },
    progress: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        cardset: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            status: { type: String, required: true },
        }],
    }],
})

export default mongoose.model('User', userSchema);
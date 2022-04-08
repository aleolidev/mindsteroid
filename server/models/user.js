import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    isGoogleAccount: { type: Boolean, required: true},
    googleId: { type: String },
    imageUrl: { type: String },
})

export default mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update `updatedAt` field before saving
FlashcardSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Flashcard = mongoose.model('Flashcard', FlashcardSchema);
module.exports = Flashcard;

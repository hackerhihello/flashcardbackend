const Flashcard = require('../models/Flashcard');

// Create a new flashcard
exports.createFlashcard = async (req, res) => {
    try {
        const { question, answer, createdAt, updatedAt } = req.body;
        const flashcard = new Flashcard({
            question,
            answer,
            createdAt,
            updatedAt,
            userId: req.user.id // Assuming you have user authentication
        });
        await flashcard.save();
        res.status(201).json(flashcard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all flashcards
exports.getFlashcards = async (req, res) => {
    try {
        const flashcards = await Flashcard.find({ userId: req.user.id });
        res.status(200).json(flashcards);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a flashcard by ID
exports.getFlashcardById = async (req, res) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id);
        if (!flashcard || flashcard.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.status(200).json(flashcard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a flashcard
exports.updateFlashcard = async (req, res) => {
    try {
        // console.log('Request Body:', req.body);

        const { question, answer, createdAt, updatedAt } = req.body; // Include updatedAt if needed
        const flashcard = await Flashcard.findById(req.params.id);
        
        if (!flashcard || flashcard.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        
        // Update question, answer, createdAt, and updatedAt
        flashcard.question = question;
        flashcard.answer = answer;

        // Update createdAt to current time
        flashcard.createdAt = createdAt; // Update createdAt to current time
        flashcard.updatedAt = updatedAt ? new Date(updatedAt) : Date.now(); // Update updatedAt

        await flashcard.save();
        res.status(200).json(flashcard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// backend/controllers/flashcardController.js
exports.deleteFlashcard = async (req, res) => {
    // console.log("Deleting flashcard with ID:", req.params.id);
    try {
        const flashcard = await Flashcard.findById(req.params.id);
        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        
        // Instead of calling remove, use findByIdAndDelete
        await Flashcard.findByIdAndDelete(req.params.id);
        
        res.status(204).send(); // No content response
    } catch (error) {
        console.error("Error deleting flashcard:", error);
        res.status(500).json({ message: 'Error deleting flashcard', error });
    }
};


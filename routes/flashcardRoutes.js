// backend/routes/flashcardRoutes.js
const express = require('express');
const {
    createFlashcard,
    getFlashcards,
    updateFlashcard,
    deleteFlashcard,
    getFlashcardById
} = require('../controllers/flashcardController');
const { protect } = require('../middleware/authMiddleware'); // Ensure only authenticated users can access these routes

const router = express.Router();

// Route to create a new flashcard
router.post('/', protect, createFlashcard);

// Route to get all flashcards for the authenticated user
router.get('/', protect, getFlashcards);

// Route to get by id flashcards for the authenticated user
router.get('/:id', protect,getFlashcardById);

// Route to update a flashcard by ID
router.put('/:id', protect, updateFlashcard);

// Route to delete a flashcard by ID
router.delete('/:id', protect, deleteFlashcard);

module.exports = router;

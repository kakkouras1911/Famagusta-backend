const express = require('express');
const router = express.Router();
const { getQuizzesBySection, getReviewQuizzes, submitAnswer } = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.get('/sections/:sectionId/quizzes', authMiddleware, getQuizzesBySection);
router.get('/review', authMiddleware, getReviewQuizzes);
router.post('/answers', authMiddleware, submitAnswer);  

module.exports = router;
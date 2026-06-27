const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const { createQuiz, createSection, deleteSection } = require('../controllers/adminController')

router.post('/quiz', authMiddleware, adminMiddleware, createQuiz)
router.post('/section', authMiddleware, adminMiddleware, createSection)
router.delete('/section/:id', authMiddleware, adminMiddleware, deleteSection)

module.exports = router
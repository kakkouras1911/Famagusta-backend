const express = require('express')
const router = express.Router()
const { getAllSections, getSectionById } = require('../controllers/sectionController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, getAllSections)
router.get('/:id', authMiddleware, getSectionById)

module.exports = router
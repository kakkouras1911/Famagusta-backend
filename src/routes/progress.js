const express = require('express')
const router = express.Router()
const { getUserProgress, getUserStats } = require('../controllers/progressController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, getUserProgress)
router.get('/stats', authMiddleware, getUserStats)

module.exports = router
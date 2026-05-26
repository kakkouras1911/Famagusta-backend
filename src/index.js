const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const sectionRoutes = require('./routes/sections')
const quizRoutes = require('./routes/quiz')
const progressRoutes = require('./routes/progress')
const adaptiveRoutes = require('./routes/adaptive')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/sections', sectionRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/adaptive', adaptiveRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Famagusta API is running!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
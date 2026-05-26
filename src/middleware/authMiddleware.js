const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Δεν έχεις πρόσβαση - δεν υπάρχει token' })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.userId

    next()

  } catch (error) {
    res.status(401).json({ message: 'Δεν έχεις πρόσβαση - μη έγκυρο token' })
  }
}

module.exports = authMiddleware
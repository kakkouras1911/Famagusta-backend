const jwt = require('jsonwebtoken')
const prisma = require('../prisma')

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Δεν έχεις πρόσβαση - δεν υπάρχει token' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Decoded userId:', decoded.userId)

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })
    console.log('Found user:', user)

    if (!user) {
      return res.status(401).json({ message: 'Ο χρήστης δεν βρέθηκε' })
    }

    req.userId = user.id
    req.userRole = user.role
    console.log('User role:', user.role)

    next()

  } catch (error) {
    res.status(401).json({ message: 'Δεν έχεις πρόσβαση - μη έγκυρο token' })
  }
}

module.exports = authMiddleware
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../prisma')

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Έλεγχος αν υπάρχει ήδη ο χρήστης
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'Ο χρήστης υπάρχει ήδη' })
    }

    // Κρυπτογράφηση κωδικού
    const hashedPassword = await bcrypt.hash(password, 10)

    // Δημιουργία χρήστη
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    // Δημιουργία JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'Επιτυχής εγγραφή',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    res.status(500).json({ message: 'Σφάλμα στον server', error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
     console.log('Login attempt:', email)

    // Εύρεση χρήστη
    const user = await prisma.user.findUnique({
      where: { email }
    })
    console.log('User found:', user)

    if (!user) {
      return res.status(400).json({ message: 'Λάθος email ή κωδικός' })
    }

    // Έλεγχος κωδικού
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(400).json({ message: 'Λάθος email ή κωδικός' })
    }

    // Δημιουργία JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Επιτυχής σύνδεση',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.log('Login error:', error.message)
    res.status(500).json({ message: 'Σφάλμα στον server', error: error.message })
  }
}

module.exports = { register, login }
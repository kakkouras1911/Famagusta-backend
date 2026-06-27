const adminMiddleware = (req, res, next) => {
  if (req.userRole !== 'ADMIN') {
    return res.status(403).json({ message: 'Δεν έχεις δικαιώματα διαχειριστή' })
  }
  next()
}

module.exports = adminMiddleware
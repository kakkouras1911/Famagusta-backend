const prisma = require('../prisma')

const getUserProgress = async (req, res) => {
  try {
    const progress = await prisma.userProgress.findMany({
      where: { userId: req.userId },
      include: { section: true }
    })

    res.json(progress)
  } catch (error) {
    res.status(500).json({ message: 'Σφάλμα στον server', error: error.message })
  }
}

const getUserStats = async (req, res) => {
  try {
    // Συνολικές απαντήσεις
    const totalAttempts = await prisma.quizAttempt.count({
      where: { userId: req.userId }
    })

    // Σωστές απαντήσεις
    const correctAttempts = await prisma.quizAttempt.count({
      where: { userId: req.userId, correct: true }
    })

    // Ολοκληρωμένες ενότητες
    const completedSections = await prisma.userProgress.count({
      where: { userId: req.userId, completed: true }
    })

    // Στατιστικά ανά ενότητα
    const sectionStats = await prisma.userProgress.findMany({
      where: { userId: req.userId },
      include: { section: { select: { title: true } } }
    })

    // Συχνότερα λάθη ανά ενότητα
    const wrongAnswers = await prisma.quizAttempt.findMany({
      where: { userId: req.userId, correct: false },
      include: {
        quiz: {
          select: {
            question: true,
            sectionId: true,
            section: { select: { title: true } }
          }
        }
      }
    })

    res.json({
      totalAttempts,
      correctAttempts,
      successRate: totalAttempts > 0 
        ? Math.round((correctAttempts / totalAttempts) * 100) 
        : 0,
      completedSections,
      sectionStats,
      wrongAnswers
    })

  } catch (error) {
    res.status(500).json({ message: 'Σφάλμα στον server', error: error.message })
  }
}

module.exports = { getUserProgress, getUserStats }
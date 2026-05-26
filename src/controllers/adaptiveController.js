const prisma = require('../prisma')

const getRecommendations = async (req, res) => {
  try {
    const userId = req.userId

    // Παίρνουμε την πρόοδο του χρήστη
    const progress = await prisma.userProgress.findMany({
      where: { userId },
      include: { section: true }
    })

    // Παίρνουμε όλες τις ενότητες
    const allSections = await prisma.section.findMany({
      orderBy: { order: 'asc' }
    })

    const recommendations = []

    for (const section of allSections) {
      const sectionProgress = progress.find(p => p.sectionId === section.id)

      if (!sectionProgress) {
        // Ο χρήστης δεν έχει επισκεφθεί την ενότητα
        recommendations.push({
          sectionId: section.id,
          title: section.title,
          type: 'new',
          message: 'Δεν έχεις επισκεφθεί αυτή την ενότητα ακόμα!',
          priority: 1
        })
      } else if (sectionProgress.score !== null && sectionProgress.score < 60) {
        // Χαμηλό score — χρειάζεται επανάληψη
        recommendations.push({
          sectionId: section.id,
          title: section.title,
          type: 'review',
          message: `Το score σου είναι ${Math.round(sectionProgress.score)}%. Χρειάζεσαι επανάληψη!`,
          priority: 3
        })
      } else if (sectionProgress.score !== null && sectionProgress.score >= 60 && sectionProgress.score < 80) {
        // Μέτριο score — μπορεί να βελτιωθεί
        recommendations.push({
          sectionId: section.id,
          title: section.title,
          type: 'improve',
          message: `Το score σου είναι ${Math.round(sectionProgress.score)}%. Μπορείς να τα πας καλύτερα!`,
          priority: 2
        })
      } else if (sectionProgress.score !== null && sectionProgress.score >= 80) {
        // Υψηλό score — πρόκληση
        recommendations.push({
          sectionId: section.id,
          title: section.title,
          type: 'challenge',
          message: `Εξαιρετικό! Score ${Math.round(sectionProgress.score)}%. Δοκίμασε τις δύσκολες ερωτήσεις!`,
          priority: 4
        })
      }
    }

    // Ταξινόμηση βάσει priority (review πρώτα)
    recommendations.sort((a, b) => b.priority - a.priority)

    // Επίπεδο δυσκολίας βάσει συνολικής επίδοσης
    const totalAttempts = await prisma.quizAttempt.count({ where: { userId } })
    const correctAttempts = await prisma.quizAttempt.count({ where: { userId, correct: true } })
    const successRate = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0

    let difficulty = 'easy'
    if (successRate >= 80) difficulty = 'hard'
    else if (successRate >= 60) difficulty = 'medium'

    // Προτεινόμενες ερωτήσεις βάσει δυσκολίας
    const suggestedQuizzes = await prisma.quiz.findMany({
      where: { difficulty },
      select: {
        id: true,
        question: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        difficulty: true,
        section: { select: { title: true } }
      },
      take: 5
    })

    res.json({
      recommendations,
      suggestedDifficulty: difficulty,
      suggestedQuizzes,
      overallSuccessRate: Math.round(successRate)
    })

  } catch (error) {
    res.status(500).json({ message: 'Σφάλμα στον server', error: error.message })
  }
}

module.exports = { getRecommendations }
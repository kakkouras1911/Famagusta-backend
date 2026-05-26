const prisma = require('../prisma')

const getQuizzesBySection = async (req, res) => {
  try {
    const { sectionId } = req.params

    const quizzes = await prisma.quiz.findMany({
      where: { sectionId: parseInt(sectionId) },
      select: {
        id: true,
        question: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        difficulty: true
        // δεν στέλνουμε το correct για να μην το βλέπει ο χρήστης!
      }
    })

    res.json(quizzes)
  } catch (error) {
    res.status(500).json({ message: 'Σφάλμα στον server', error: error.message })
  }
}

const getReviewQuizzes = async (req, res) => {
  try {
    // Επαναληπτικό τεστ - ερωτήσεις από όλες τις ενότητες
    const quizzes = await prisma.quiz.findMany({
      where: { sectionId: null },
      select: {
        id: true,
        question: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        difficulty: true
      }
    })

    res.json(quizzes)
  } catch (error) {
    res.status(500).json({ message: 'Σφάλμα στον server', error: error.message })
  }
}

const submitAnswer = async (req, res) => {
  try {
    const { quizId, answer } = req.body

    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(quizId) }
    })

    if (!quiz) {
      return res.status(404).json({ message: 'Η ερώτηση δεν βρέθηκε' })
    }

    const isCorrect = quiz.correct === answer

    // Αποθήκευση απάντησης
    await prisma.quizAttempt.create({
      data: {
        userId: req.userId,
        quizId: parseInt(quizId),
        answer,
        correct: isCorrect
      }
    })

    // Αν ανήκει σε ενότητα, ενημέρωσε το score
    if (quiz.sectionId) {
      const attempts = await prisma.quizAttempt.findMany({
        where: {
          userId: req.userId,
          quiz: { sectionId: quiz.sectionId }
        }
      })

      const correct = attempts.filter(a => a.correct).length
      const score = (correct / attempts.length) * 100

      await prisma.userProgress.upsert({
        where: {
          userId_sectionId: {
            userId: req.userId,
            sectionId: quiz.sectionId
          }
        },
        update: { score, completed: score >= 60 },
        create: {
          userId: req.userId,
          sectionId: quiz.sectionId,
          score,
          completed: score >= 60
        }
      })
    }

    res.json({
      correct: isCorrect,
      correctAnswer: quiz.correct,
      explanation: isCorrect ? 'Σωστά! Συνέχισε!' : `Λάθος! Η σωστή απάντηση είναι: ${quiz.correct}`
    })

  } catch (error) {
    res.status(500).json({ message: 'Σφάλμα στον server', error: error.message })
  }
}

module.exports = { getQuizzesBySection, getReviewQuizzes, submitAnswer }
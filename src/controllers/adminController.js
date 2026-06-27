const prisma = require('../prisma')

const createQuiz = async (req, res) => {
  try {
    const { sectionId, question, optionA, optionB, optionC, optionD, correct, difficulty, reviewTest } = req.body

    if (!question || !optionA || !optionB || !optionC || !optionD || !correct || !difficulty) {
      return res.status(400).json({ message: 'Συμπλήρωσε όλα τα απαιτούμενα πεδία' })
    }

    const quiz = await prisma.quiz.create({
      data: {
        sectionId: sectionId ? parseInt(sectionId) : null,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correct,
        difficulty,
        reviewTest: reviewTest ? parseInt(reviewTest) : null
      }
    })

    res.status(201).json({ message: 'Η ερώτηση προστέθηκε επιτυχώς', quiz })

  } catch (error) {
    res.status(500).json({ message: 'Σφάλμα στον server', error: error.message })
  }
}

const createSection = async (req, res) => {
  try {
    const { title, description, imageUrl, content, quizzes } = req.body

    if (!title || !description) {
      return res.status(400).json({ message: 'Συμπλήρωσε τίτλο και περιγραφή' })
    }

    const lastSection = await prisma.section.findFirst({
      orderBy: { order: 'desc' }
    })
    const newOrder = lastSection ? lastSection.order + 1 : 1

    const section = await prisma.section.create({
      data: { title, description, imageUrl: imageUrl || null, order: newOrder }
    })

    if (content && Array.isArray(content)) {
      for (let i = 0; i < content.length; i++) {
        await prisma.content.create({
          data: {
            sectionId: section.id,
            title: content[i].title || '',
            body: content[i].body,
            type: content[i].type || 'text',
            order: i + 1
          }
        })
      }
    }

    if (quizzes && Array.isArray(quizzes)) {
      for (const quiz of quizzes) {
        await prisma.quiz.create({
          data: {
            sectionId: section.id,
            question: quiz.question,
            optionA: quiz.optionA,
            optionB: quiz.optionB,
            optionC: quiz.optionC,
            optionD: quiz.optionD,
            correct: quiz.correct,
            difficulty: quiz.difficulty || 'easy'
          }
        })
      }
    }

    res.status(201).json({ message: 'Το κεφάλαιο δημιουργήθηκε επιτυχώς', section })

  } catch (error) {
    res.status(500).json({ message: 'Σφάλμα στον server', error: error.message })
  }
}
const deleteSection = async (req, res) => {
  try {
    const { id } = req.params

    // Διαγραφή σχετικών εγγραφών πρώτα (λόγω foreign keys)
    await prisma.quizAttempt.deleteMany({
      where: { quiz: { sectionId: parseInt(id) } }
    })
    await prisma.quiz.deleteMany({
      where: { sectionId: parseInt(id) }
    })
    await prisma.userProgress.deleteMany({
      where: { sectionId: parseInt(id) }
    })
    await prisma.content.deleteMany({
      where: { sectionId: parseInt(id) }
    })
    await prisma.section.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Η ενότητα διαγράφηκε επιτυχώς' })

  } catch (error) {
    res.status(500).json({ message: 'Σφάλμα στον server', error: error.message })
  }
}

module.exports = { createQuiz, createSection, deleteSection }



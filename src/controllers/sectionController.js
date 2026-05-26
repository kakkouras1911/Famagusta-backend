const prisma = require('../prisma')

const getAllSections = async (req, res) => {
  try {
    const sections = await prisma.section.findMany({
      orderBy: { order: 'asc' }
    })
    res.json(sections)
  } catch (error) {
    res.status(500).json({ message: 'Σφάλμα στον server', error: error.message })
  }
}

const getSectionById = async (req, res) => {
  try {
    const { id } = req.params

    const section = await prisma.section.findUnique({
      where: { id: parseInt(id) },
      include: { content: { orderBy: { order: 'asc' } } }
    })

    if (!section) {
      return res.status(404).json({ message: 'Η ενότητα δεν βρέθηκε' })
    }

    // Καταγραφή επίσκεψης χρήστη
    await prisma.userProgress.upsert({
      where: {
        userId_sectionId: {
          userId: req.userId,
          sectionId: parseInt(id)
        }
      },
      update: {
        visitCount: { increment: 1 },
        lastVisited: new Date()
      },
      create: {
        userId: req.userId,
        sectionId: parseInt(id),
        visitCount: 1
      }
    })

    res.json(section)
  } catch (error) {
    res.status(500).json({ message: 'Σφάλμα στον server', error: error.message })
  }
}

module.exports = { getAllSections, getSectionById }
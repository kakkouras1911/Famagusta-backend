const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {

  // ===== SECTIONS =====
  const existingSections = await prisma.section.count()

  if (existingSections === 0) {
    const sections = [
      {
        title: 'Αμμόχωστος μέσα στους αιώνες',
        description: 'Από την αρχαιότητα έως τη σύγχρονη εποχή — η ιστορική εξέλιξη της πόλης.',
        order: 1
      },
      {
        title: 'Μνημεία & Πολιτιστική Κληρονομιά',
        description: 'Κάστρα, εκκλησίες και αρχιτεκτονική της Αμμοχώστου.',
        order: 2
      },
      {
        title: 'Η Εισβολή του 1974',
        description: 'Τα γεγονότα, οι συνέπειες και το διεθνές δίκαιο.',
        order: 3
      },
      {
        title: 'Βαρώσια & Η Πόλη Σήμερα',
        description: 'Η κατεχόμενη πόλη, οι πρόσφυγες και η κατάσταση σήμερα.',
        order: 4
      }
    ]
    for (const section of sections) {
      await prisma.section.create({ data: section })
    }
    console.log('Οι ενότητες δημιουργήθηκαν επιτυχώς!')
  } else {
    console.log('Οι ενότητες υπάρχουν ήδη, παράλειψη...')
  }

  // ===== QUIZZES =====
  const existingQuizzes = await prisma.quiz.count()

  if (existingQuizzes === 0) {
    const quizzes = [
      // Ενότητα 1 - easy
      {
        sectionId: 1,
        question: 'Ποια αρχαία βασίλεια ίδρυσαν αποικίες στην Αμμόχωστο;',
        optionA: 'Οι Φοίνικες',
        optionB: 'Οι Μυκηναίοι Έλληνες',
        optionC: 'Οι Πέρσες',
        optionD: 'Οι Αιγύπτιοι',
        correct: 'B',
        difficulty: 'easy'
      },
      {
        sectionId: 1,
        question: 'Ποια δύναμη κατέκτησε την Αμμόχωστο το 1571;',
        optionA: 'Οι Βενετοί',
        optionB: 'Οι Γενουάτες',
        optionC: 'Οι Οθωμανοί',
        optionD: 'Οι Σταυροφόροι',
        correct: 'C',
        difficulty: 'easy'
      },
      // Ενότητα 1 - medium
      {
        sectionId: 1,
        question: 'Ποιος Πτολεμαίος ίδρυσε την Αμμόχωστο;',
        optionA: 'Πτολεμαίος Α\'',
        optionB: 'Πτολεμαίος Β\'',
        optionC: 'Πτολεμαίος Γ\'',
        optionD: 'Πτολεμαίος Δ\'',
        correct: 'B',
        difficulty: 'medium'
      },
      {
        sectionId: 1,
        question: 'Σε ποιον αιώνα ιδρύθηκε η Αμμόχωστος;',
        optionA: '1ο αιώνα π.Χ.',
        optionB: '2ο αιώνα π.Χ.',
        optionC: '3ο αιώνα π.Χ.',
        optionD: '4ο αιώνα π.Χ.',
        correct: 'C',
        difficulty: 'medium'
      },
      // Ενότητα 1 - hard
      {
        sectionId: 1,
        question: 'Πόσο διήρκεσε η βενετική κυριαρχία στην Αμμόχωστο;',
        optionA: 'Περίπου 50 χρόνια',
        optionB: 'Περίπου 80 χρόνια',
        optionC: 'Περίπου 100 χρόνια',
        optionD: 'Περίπου 150 χρόνια',
        correct: 'C',
        difficulty: 'hard'
      },
      {
        sectionId: 1,
        question: 'Πόσους μήνες διήρκεσε η οθωμανική πολιορκία της Αμμοχώστου το 1571;',
        optionA: '6 μήνες',
        optionB: '8 μήνες',
        optionC: '11 μήνες',
        optionD: '14 μήνες',
        correct: 'C',
        difficulty: 'hard'
      },
      // Ενότητα 2 - easy
      {
        sectionId: 2,
        question: 'Ποιο είναι το πιο γνωστό μνημείο της Αμμοχώστου;',
        optionA: 'Το Κάστρο της Κερύνειας',
        optionB: 'Ο Καθεδρικός Ναός Αγίου Νικολάου',
        optionC: 'Το Παλάτι της Λευκωσίας',
        optionD: 'Ο Ναός της Αφροδίτης',
        correct: 'B',
        difficulty: 'easy'
      },
      {
        sectionId: 2,
        question: 'Σε ποιον ρυθμό είναι χτισμένος ο Καθεδρικός Ναός Αγίου Νικολάου;',
        optionA: 'Βυζαντινό',
        optionB: 'Ρωμαϊκό',
        optionC: 'Γοτθικό',
        optionD: 'Οθωμανικό',
        correct: 'C',
        difficulty: 'easy'
      },
      // Ενότητα 2 - medium
      {
        sectionId: 2,
        question: 'Πότε χτίστηκε ο Καθεδρικός Ναός Αγίου Νικολάου;',
        optionA: '12ο αιώνα',
        optionB: '13ο αιώνα',
        optionC: '14ο αιώνα',
        optionD: '15ο αιώνα',
        correct: 'C',
        difficulty: 'medium'
      },
      {
        sectionId: 2,
        question: 'Πόσα μέτρα είναι το πάχος των Βενετικών Τειχών;',
        optionA: '4 μέτρα',
        optionB: '6 μέτρα',
        optionC: '8 μέτρα',
        optionD: '10 μέτρα',
        correct: 'C',
        difficulty: 'medium'
      },
      // Ενότητα 2 - hard
      {
        sectionId: 2,
        question: 'Ποιον Καθεδρικό της Ευρώπης θυμίζει ο Ναός Αγίου Νικολάου;',
        optionA: 'Καθεδρικό του Λονδίνου',
        optionB: 'Καθεδρικό της Ρεμς',
        optionC: 'Καθεδρικό της Βαρκελώνης',
        optionD: 'Καθεδρικό της Ρώμης',
        correct: 'B',
        difficulty: 'hard'
      },
      {
        sectionId: 2,
        question: 'Ποιο είναι το σημερινό όνομα του Καθεδρικού Ναού Αγίου Νικολάου;',
        optionA: 'Τζαμί Σελιμιγιέ',
        optionB: 'Τζαμί Λαλά Μουσταφά Πασά',
        optionC: 'Τζαμί Ομεριγέ',
        optionD: 'Τζαμί Αγίας Σοφίας',
        correct: 'B',
        difficulty: 'hard'
      },
      // Ενότητα 3 - easy
      {
        sectionId: 3,
        question: 'Πότε έγινε η τουρκική εισβολή στην Κύπρο;',
        optionA: 'Ιούλιος 1974',
        optionB: 'Αύγουστος 1974',
        optionC: 'Ιούνιος 1974',
        optionD: 'Σεπτέμβριος 1974',
        correct: 'A',
        difficulty: 'easy'
      },
      {
        sectionId: 3,
        question: 'Ποιο ψήφισμα του ΟΗΕ ζητά την αποχώρηση των τουρκικών στρατευμάτων από την Κύπρο;',
        optionA: 'Ψήφισμα 541',
        optionB: 'Ψήφισμα 353',
        optionC: 'Ψήφισμα 186',
        optionD: 'Ψήφισμα 365',
        correct: 'B',
        difficulty: 'easy'
      },
      // Ενότητα 3 - medium
      {
        sectionId: 3,
        question: 'Τι προηγήθηκε της τουρκικής εισβολής;',
        optionA: 'Εμφύλιος πόλεμος',
        optionB: 'Πραξικόπημα της χούντας κατά του Μακάριου',
        optionC: 'Δημοψήφισμα',
        optionD: 'Οικονομική κρίση',
        correct: 'B',
        difficulty: 'medium'
      },
      {
        sectionId: 3,
        question: 'Πόσοι Ελληνοκύπριοι έγιναν πρόσφυγες το 1974;',
        optionA: '50.000',
        optionB: '100.000',
        optionC: '150.000',
        optionD: '200.000',
        correct: 'D',
        difficulty: 'medium'
      },
      // Ενότητα 3 - hard
      {
        sectionId: 3,
        question: 'Πώς ονομάζεται η γραμμή κατάπαυσης πυρός που χωρίζει την Κύπρο;',
        optionA: 'Κόκκινη Γραμμή',
        optionB: 'Μπλε Γραμμή',
        optionC: 'Πράσινη Γραμμή',
        optionD: 'Λευκή Γραμμή',
        correct: 'C',
        difficulty: 'hard'
      },
      {
        sectionId: 3,
        question: 'Πόσες φάσεις είχε η τουρκική εισβολή στην Κύπρο;',
        optionA: 'Μία',
        optionB: 'Δύο',
        optionC: 'Τρεις',
        optionD: 'Τέσσερις',
        correct: 'B',
        difficulty: 'hard'
      },
      // Ενότητα 4 - easy
      {
        sectionId: 4,
        question: 'Πότε έγινε μερική επαναλειτουργία της παραλίας των Βαρωσίων;',
        optionA: '2018',
        optionB: '2020',
        optionC: '2022',
        optionD: '2016',
        correct: 'B',
        difficulty: 'easy'
      },
      {
        sectionId: 4,
        question: 'Πόσοι περίπου Ελληνοκύπριοι εκτοπίστηκαν το 1974;',
        optionA: '100.000',
        optionB: '160.000',
        optionC: '200.000',
        optionD: '80.000',
        correct: 'C',
        difficulty: 'easy'
      },
      // Ενότητα 4 - medium
      {
        sectionId: 4,
        question: 'Ποιοι διάσημοι επισκέφθηκαν τα Βαρώσια πριν το 1974;',
        optionA: 'Μέριλιν Μονρόε και Φρανκ Σινάτρα',
        optionB: 'Ελίζαμπεθ Τέιλορ και Ρίτσαρντ Μπάρτον',
        optionC: 'Όντρεϊ Χέπμπορν και Κάρι Γκραντ',
        optionD: 'Γκρέις Κέλι και Ράινερ Γ\'',
        correct: 'B',
        difficulty: 'medium'
      },
      {
        sectionId: 4,
        question: 'Τι ήταν τα Βαρώσια πριν το 1974;',
        optionA: 'Βιομηχανική περιοχή',
        optionB: 'Δημοφιλές τουριστικό θέρετρο',
        optionC: 'Στρατιωτική βάση',
        optionD: 'Αλιευτικό χωριό',
        correct: 'B',
        difficulty: 'medium'
      },
      // Ενότητα 4 - hard
      {
        sectionId: 4,
        question: 'Ποιο όργανο του ΟΗΕ καταδίκασε το άνοιγμα των Βαρωσίων το 2020;',
        optionA: 'Γενική Συνέλευση',
        optionB: 'Διεθνές Δικαστήριο',
        optionC: 'Συμβούλιο Ασφαλείας',
        optionD: 'Επιτροπή Ανθρωπίνων Δικαιωμάτων',
        correct: 'C',
        difficulty: 'hard'
      },
      {
        sectionId: 4,
        question: 'Πότε περιέκλεισαν τα τουρκικά στρατεύματα τα Βαρώσια με συρματόπλεγμα;',
        optionA: '1974',
        optionB: '1975',
        optionC: '1976',
        optionD: '1977',
        correct: 'A',
        difficulty: 'hard'
      },
      // Επαναληπτικές ερωτήσεις
      {
        sectionId: null,
        question: 'Ποια χώρα πραγματοποίησε την εισβολή στην Κύπρο το 1974;',
        optionA: 'Ελλάδα',
        optionB: 'Συρία',
        optionC: 'Τουρκία',
        optionD: 'Ισραήλ',
        correct: 'C',
        difficulty: 'easy'
      },
      {
        sectionId: null,
        question: 'Σε ποιον αρχιτεκτονικό ρυθμό ανήκει ο Καθεδρικός Ναός Αγίου Νικολάου;',
        optionA: 'Βυζαντινό',
        optionB: 'Γοτθικό',
        optionC: 'Ρωμαϊκό',
        optionD: 'Νεοκλασικό',
        correct: 'B',
        difficulty: 'medium'
      },
      // Επαναληπτικό Τεστ 1 - Ενότητες 1 & 2
{
  sectionId: null,
  reviewTest: 1,
  question: 'Ποιος ίδρυσε την Αμμόχωστο;',
  optionA: 'Αλέξανδρος ο Μέγας',
  optionB: 'Πτολεμαίος Β\'',
  optionC: 'Ιούλιος Καίσαρας',
  optionD: 'Κωνσταντίνος Α\'',
  correct: 'B',
  difficulty: 'easy'
},
{
  sectionId: null,
  reviewTest: 1,
  question: 'Σε ποιον ρυθμό είναι χτισμένος ο Καθεδρικός Ναός Αγίου Νικολάου;',
  optionA: 'Βυζαντινό',
  optionB: 'Ρωμαϊκό',
  optionC: 'Γοτθικό',
  optionD: 'Οθωμανικό',
  correct: 'C',
  difficulty: 'easy'
},
{
  sectionId: null,
  reviewTest: 1,
  question: 'Ποια δύναμη κατέκτησε την Αμμόχωστο το 1571;',
  optionA: 'Οι Βενετοί',
  optionB: 'Οι Γενουάτες',
  optionC: 'Οι Οθωμανοί',
  optionD: 'Οι Σταυροφόροι',
  correct: 'C',
  difficulty: 'medium'
},
{
  sectionId: null,
  reviewTest: 1,
  question: 'Πόσα μέτρα είναι το πάχος των Βενετικών Τειχών;',
  optionA: '4 μέτρα',
  optionB: '6 μέτρα',
  optionC: '8 μέτρα',
  optionD: '10 μέτρα',
  correct: 'C',
  difficulty: 'medium'
},
// Επαναληπτικό Τεστ 2 - Ενότητες 3 & 4
{
  sectionId: null,
  reviewTest: 2,
  question: 'Πότε έγινε η τουρκική εισβολή στην Κύπρο;',
  optionA: 'Ιούνιος 1974',
  optionB: 'Ιούλιος 1974',
  optionC: 'Αύγουστος 1974',
  optionD: 'Σεπτέμβριος 1974',
  correct: 'B',
  difficulty: 'easy'
},
{
  sectionId: null,
  reviewTest: 2,
  question: 'Τι ήταν τα Βαρώσια πριν το 1974;',
  optionA: 'Βιομηχανική περιοχή',
  optionB: 'Στρατιωτική βάση',
  optionC: 'Δημοφιλές τουριστικό θέρετρο',
  optionD: 'Αλιευτικό χωριό',
  correct: 'C',
  difficulty: 'easy'
},
{
  sectionId: null,
  reviewTest: 2,
  question: 'Ποιο ψήφισμα του ΟΗΕ ζητά την αποχώρηση των τουρκικών στρατευμάτων;',
  optionA: 'Ψήφισμα 541',
  optionB: 'Ψήφισμα 353',
  optionC: 'Ψήφισμα 186',
  optionD: 'Ψήφισμα 365',
  correct: 'B',
  difficulty: 'medium'
},
{
  sectionId: null,
  reviewTest: 2,
  question: 'Πότε έγινε μερική επαναλειτουργία της παραλίας των Βαρωσίων;',
  optionA: '2018',
  optionB: '2019',
  optionC: '2020',
  optionD: '2021',
  correct: 'C',
  difficulty: 'medium'
},
// Επαναληπτικό Τεστ 3 - Όλες οι ενότητες
{
  sectionId: null,
  reviewTest: 3,
  question: 'Ποια χώρα πραγματοποίησε την εισβολή στην Κύπρο το 1974;',
  optionA: 'Ελλάδα',
  optionB: 'Συρία',
  optionC: 'Τουρκία',
  optionD: 'Ισραήλ',
  correct: 'C',
  difficulty: 'easy'
},
{
  sectionId: null,
  reviewTest: 3,
  question: 'Ποιο είναι το πιο γνωστό μνημείο της Αμμοχώστου;',
  optionA: 'Κάστρο Κερύνειας',
  optionB: 'Καθεδρικός Ναός Αγίου Νικολάου',
  optionC: 'Παλάτι Λευκωσίας',
  optionD: 'Ναός Αφροδίτης',
  correct: 'B',
  difficulty: 'easy'
},
{
  sectionId: null,
  reviewTest: 3,
  question: 'Πώς ονομάζεται η γραμμή κατάπαυσης πυρός που χωρίζει την Κύπρο;',
  optionA: 'Κόκκινη Γραμμή',
  optionB: 'Μπλε Γραμμή',
  optionC: 'Πράσινη Γραμμή',
  optionD: 'Λευκή Γραμμή',
  correct: 'C',
  difficulty: 'medium'
},
{
  sectionId: null,
  reviewTest: 3,
  question: 'Πόσοι Ελληνοκύπριοι εκτοπίστηκαν το 1974;',
  optionA: '50.000',
  optionB: '100.000',
  optionC: '150.000',
  optionD: '200.000',
  correct: 'D',
  difficulty: 'hard'
},
    ]

    for (const quiz of quizzes) {
      await prisma.quiz.create({ data: quiz })
    }
    console.log('Οι ερωτήσεις δημιουργήθηκαν επιτυχώς!')
  } else {
    console.log('Οι ερωτήσεις υπάρχουν ήδη, παράλειψη...')
  }

  // ===== CONTENT =====
  const existingContent = await prisma.content.count()

  if (existingContent === 0) {
    const contents = [
      {
        sectionId: 1,
        title: 'Οι Απαρχές της Αμμοχώστου',
        body: 'Η Αμμόχωστος ιδρύθηκε τον 3ο αιώνα π.Χ. από τον Πτολεμαίο Β\' της Αιγύπτου. Το όνομά της προέρχεται από τις ελληνικές λέξεις "άμμος" και "κώστος", που σημαίνει "θαμμένη στην άμμο". Η πόλη αναπτύχθηκε γρήγορα λόγω της στρατηγικής της θέσης στην ανατολική Μεσόγειο.',
        type: 'text',
        order: 1
      },
      {
        sectionId: 1,
        title: 'Βυζαντινή & Λουζινιανή Περίοδος',
        body: 'Κατά την βυζαντινή περίοδο η Αμμόχωστος αναπτύχθηκε ως σημαντικό λιμάνι. Το 1192 πέρασε στα χέρια των Λουζινιανών Σταυροφόρων και έγινε ένα από τα πλουσιότερα λιμάνια της Μεσογείου.',
        type: 'text',
        order: 2
      },
      {
        sectionId: 1,
        title: 'Οθωμανική Κατάκτηση',
        body: 'Το 1571 οι Οθωμανοί κατέκτησαν την Αμμόχωστο μετά από πολιορκία 11 μηνών. Η πόλη πέρασε στην οθωμανική κυριαρχία για περίπου 300 χρόνια. Πολλές εκκλησίες μετατράπηκαν σε τζαμιά.',
        type: 'text',
        order: 3
      },
      {
  sectionId: 2,
  title: 'Ο Καθεδρικός Ναός Αγίου Νικολάου',
  body: 'Ο Καθεδρικός Ναός του Αγίου Νικολάου είναι το πιο εντυπωσιακό μνημείο της Αμμοχώστου. Χτίστηκε τον 14ο αιώνα σε γοτθικό ρυθμό. Μετά την οθωμανική κατάκτηση μετατράπηκε σε τζαμί.',
  type: 'text',
  order: 1
      },
      {
  sectionId: 2,
  title: 'Το Κάστρο Οθέλλου',
  body: 'Το Κάστρο Οθέλλου είναι ένα από τα καλύτερα διατηρημένα μεσαιωνικά κάστρα της Κύπρου. Χτίστηκε από τους Λουζινιανούς και αργότερα ενισχύθηκε από τους Βενετούς. Συνδέεται με την τραγωδία "Οθέλλος" του Σαίξπηρ.',
  type: 'text',
  order: 2
},
{
  sectionId: 2,
  title: 'Τα Βενετικά Τείχη',
  body: 'Τα Βενετικά Τείχη της Αμμοχώστου είναι από τα καλύτερα διατηρημένα της εποχής τους στον κόσμο. Χτίστηκαν τον 16ο αιώνα από τους Βενετούς. Το πάχος τους φτάνει τα 8 μέτρα.',
  type: 'text',
  order: 3
},
{
  sectionId: 3,
  title: 'Η Εισβολή της 20ής Ιουλίου 1974',
  body: 'Στις 20 Ιουλίου 1974, μετά το πραξικόπημα της χούντας κατά του Προέδρου Μακάριου, τουρκικά στρατεύματα αποβιβάστηκαν στη βόρεια Κύπρο. Η εισβολή έγινε παρά τις διεθνείς κατακραυγές και τα ψηφίσματα του ΟΗΕ.',
  type: 'text',
  order: 1
},
{
  sectionId: 3,
  title: 'Το Ψήφισμα 353 του ΟΗΕ',
  body: 'Ο ΟΗΕ αντέδρασε άμεσα στην τουρκική εισβολή. Το Ψήφισμα 353 ζητούσε την άμεση κατάπαυση του πυρός και την αποχώρηση όλων των ξένων στρατευμάτων. Η Τουρκία αγνόησε το ψήφισμα.',
  type: 'text',
  order: 2
},
{
  sectionId: 3,
  title: 'Οι Συνέπειες της Εισβολής',
  body: 'Περίπου 200.000 Ελληνοκύπριοι εκτοπίστηκαν από τα σπίτια τους. Η Κύπρος χωρίστηκε στα δύο από την "Πράσινη Γραμμή" που υπάρχει μέχρι σήμερα.',
  type: 'text',
  order: 3
},
{
  sectionId: 4,
  title: 'Τα Βαρώσια πριν το 1974',
  body: 'Τα Βαρώσια ήταν ένα από τα πιο δημοφιλή τουριστικά θέρετρα της Μεσογείου. Διάσημοι επισκέπτες όπως η Ελίζαμπεθ Τέιλορ επισκέφθηκαν τα Βαρώσια.',
  type: 'text',
  order: 1
},
{
  sectionId: 4,
  title: 'Η Εγκατάλειψη',
  body: 'Το 1974 οι κάτοικοι εγκατέλειψαν τα σπίτια τους βιαστικά. Τουρκικά στρατεύματα περιέκλεισαν την περιοχή με συρματόπλεγμα. Για δεκαετίες η πόλη παρέμεινε "φάντασμα".',
  type: 'text',
  order: 2
},
{
  sectionId: 4,
  title: 'Η Κατάσταση Σήμερα',
  body: 'Το 2020 η Τουρκία άνοιξε μερικώς την παραλία των Βαρωσίων προκαλώντας διεθνείς αντιδράσεις. Το Συμβούλιο Ασφαλείας του ΟΗΕ καταδίκασε την κίνηση αυτή.',
  type: 'text',
  order: 3
}
]
    for (const content of contents) {
      await prisma.content.create({ data: content })
    }
    console.log('Το περιεχόμενο δημιουργήθηκε επιτυχώς!')
  } else {
    console.log('Το περιεχόμενο υπάρχει ήδη, παράλειψη...')
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
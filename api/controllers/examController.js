const express = require('express');
const Exam = require('../models/exam');
const router = express.Router();

// Create an exam
router.post('/', async (req, res) => {
  try {
    const { title, subject, questions, createdBy } = req.body;
    const newExam = new Exam({ title, subject, questions, createdBy });
    await newExam.save();
    res.status(201).json(newExam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get all exams
router.get('/', async (req, res) => {
  try {
    const exams = await Exam.find().populate('questions');
    //const exams = [
    //  { id: 1, subject: "Math", date: "2025-03-05", duration: "2 hours" },
    //  { id: 2, subject: "Science", date: "2025-03-07", duration: "1.5 hours" }
    //];
    
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete exams by id
router.delete('/:id', async (req, res) => {
  try {
    const examID = req.params.id;

    // Check if the exam exists
    const exam = await Exam.findById(examID);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Delete the exam
    await exam.deleteOne();

    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (err) {
    console.error('Error deleting exam:', err);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// update exam
router.put('/:id', async (req, res) => {
  try {
    const examID = req.params.id;
    const updatedData = req.body;

    const exam = await Exam.findByIdAndUpdate(examID, updatedData, { new: true });

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.status(200).json({ message: 'Exam updated successfully', exam });
  } catch (err) {
    console.error('Error updating exam:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// getExam by id 
const getExamById = async (req, res) => {
  try {
    const examId = req.params.id;
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.status(200).json(exam);
  } catch (err) {
    console.error('Error fetching exam:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
router.get('/:id', getExamById);


module.exports = router;


//og code ................................................................................................
//const express = require('express');
//const router = express.Router();
//
//// Static Exams with Questions
//const exams = [
//  {
//    id: 1,
//    subject: "Math",
//    date: "2025-03-05",
//    duration: "2 hours",
//    questions: [
//      { question: "What is 5 + 3?", options: ["5", "8", "10", "12"], answer: "8" },
//      { question: "Solve: 12 × 4", options: ["36", "40", "48", "52"], answer: "48" },
//      { question: "Find the square root of 49.", options: ["5", "6", "7", "8"], answer: "7" }
//    ]
//  },
//  {
//    id: 2,
//    subject: "Science",
//    date: "2025-03-07",
//    duration: "1.5 hours",
//    questions: [
//      { question: "What is the chemical symbol for water?", options: ["O2", "CO2", "H2O", "N2"], answer: "H2O" },
//      { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
//      { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" }
//    ]
//  }
//];
//
//// 📌 GET all exams (with questions)
//router.get('/', async (req, res) => {
//  try {
//    console.log("📢 Fetching all exams...");
//    res.status(200).json(exams);
//  } catch (err) {
//    res.status(500).json({ error: err.message });
//  }
//});
//
//// 📌 GET an exam by ID (with questions)
//router.get('/:id', async (req, res) => {
//  try {
//    const examId = parseInt(req.params.id);
//    console.log(`📢 Fetching exam with ID: ${examId}`);
//
//    const exam = exams.find(exam => exam.id === examId);
//    if (!exam) {
//      return res.status(404).json({ error: "Exam not found" });
//    }
//
//    res.status(200).json(exam);
//  } catch (err) {
//    console.error("❌ Error fetching exam:", err);
//    res.status(500).json({ error: "Internal server error" });
//  }
//});
//
//module.exports = router;
//
//router.post('/submit', async (req, res) => {
//  try {
//    const { examId, answers } = req.body;
//
//    console.log("📢 Exam Submission Received:", req.body);
//
//    // Find the correct exam
//    const exam = exams.find(e => e.id === parseInt(examId));
//    if (!exam) {
//      return res.status(404).json({ error: "Exam not found" });
//    }
//
//    // Calculate score
//    let score = 0;
//    exam.questions.forEach((q, index) => {
//      if (answers[index] === q.answer) {
//        score++;
//      }
//    });
//
//    console.log("✅ Score Calculated:", score);
//    res.status(200).json({ message: "Exam submitted successfully", score });
//
//  } catch (err) {
//    console.error("🔥 Error submitting exam:", err);
//    res.status(500).json({ error: "Internal server error" });
//  }
//});
//
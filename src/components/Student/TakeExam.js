//import axios from "axios";
//import React, { useEffect, useState } from "react";
//import "./takeExam.css";
//
//const TakeExam = () => {
//  const [exams, setExams] = useState([]);
//  const [selectedExam, setSelectedExam] = useState(null);
//  const [currentQuestion, setCurrentQuestion] = useState(0);
//  const [selectedOption, setSelectedOption] = useState("");
//  const [score, setScore] = useState(0);
//  const [showResult, setShowResult] = useState(false);
//  const [timeLeft, setTimeLeft] = useState(30);
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState(null);
//
//  // Fetch all exams when component mounts
//  useEffect(() => {
//    fetchExams();
//  }, []);
//
//  // Timer effect
//  useEffect(() => {
//    let timer;
//    if (selectedExam && timeLeft > 0 && !showResult) {
//      timer = setInterval(() => {
//        setTimeLeft((prevTime) => prevTime - 1);
//      }, 1000);
//    } else if (timeLeft === 0 && !showResult) {
//      handleNext();
//    }
//
//    return () => {
//      if (timer) clearInterval(timer);
//    };
//  }, [timeLeft, selectedExam, showResult]);
//
//  const fetchExams = async () => {
//    try {
//      const response = await axios.get("http://localhost:5001/api/exams");
//      setExams(response.data);
//      setError(null);
//    } catch (err) {
//      setError("Failed to fetch exams. Please try again later.");
//      console.error("Error fetching exams:", err);
//    } finally {
//      setLoading(false);
//    }
//  };
//
//  const handleExamSelect = (exam) => {
//    setSelectedExam(exam);
//    setCurrentQuestion(0);
//    setScore(0);
//    setSelectedOption("");
//    setShowResult(false);
//    setTimeLeft(30);
//  };
//
//  const handleOptionChange = (optionIndex) => {
//    setSelectedOption(optionIndex);
//  };
//
//  const handleNext = () => {
//    // Check if answer is correct and update score
//    if (selectedOption === selectedExam.questions[currentQuestion].correctOption) {
//      setScore(score + 1);
//    }
//
//    // Reset selected option
//    setSelectedOption("");
//
//    // Move to next question or show results
//    if (currentQuestion < selectedExam.questions.length - 1) {
//      setCurrentQuestion(currentQuestion + 1);
//      setTimeLeft(30);
//    } else {
//      setShowResult(true);
//      submitExam();
//    }
//  };
//
//  const submitExam = async () => {
//    try {
//      await axios.post("http://localhost:5001/api/exams/submit", {
//        examId: selectedExam._id,
//        score: score,
//        totalQuestions: selectedExam.questions.length,
//      });
//    } catch (error) {
//      console.error("Error submitting exam:", error);
//    }
//  };
//
//  const resetExam = () => {
//    setSelectedExam(null);
//    setCurrentQuestion(0);
//    setScore(0);
//    setSelectedOption("");
//    setShowResult(false);
//    setTimeLeft(30);
//  };
//
//  if (loading) {
//    return <div className="loading">Loading exams...</div>;
//  }
//
//  if (error) {
//    return <div className="error">{error}</div>;
//  }
//
//  return (
//    <div className="exam-container">
//      {!selectedExam ? (
//        <div className="subject-selection">
//          <h2>Available Exams</h2>
//          <div className="subject-buttons">
//            {exams.map((exam) => (
//              <button
//                key={exam._id}
//                className="btn subject-btn"
//                onClick={() => handleExamSelect(exam)}
//              >
//                {exam.title} ({exam.subject})
//              </button>
//            ))}
//          </div>
//        </div>
//      ) : !showResult ? (
//        <div className="question-card">
//          <div className="exam-header">
//            <h3>{selectedExam.title}</h3>
//            <p className="timer">Time Left: {timeLeft}s</p>
//          </div>
//          
//          <div className="question-content">
//            <h5>
//              Question {currentQuestion + 1} of {selectedExam.questions.length}
//            </h5>
//            <p>{selectedExam.questions[currentQuestion].text}</p>
//            
//            <div className="options">
//              {selectedExam.questions[currentQuestion].options.map((option, index) => (
//                <div key={index} className="option">
//                  <input
//                    type="radio"
//                    id={`option-${index}`}
//                    name="answer"
//                    value={index}
//                    onChange={() => handleOptionChange(index)}
//                    checked={selectedOption === index}
//                  />
//                  <label htmlFor={`option-${index}`}>{option}</label>
//                </div>
//              ))}
//            </div>
//
//            <button
//              className="btn next-btn"
//              onClick={handleNext}
//              disabled={selectedOption === ""}
//            >
//              {currentQuestion === selectedExam.questions.length - 1 ? "Submit" : "Next"}
//            </button>
//          </div>
//        </div>
//      ) : (
//        <div className="result-card">
//          <h3>{selectedExam.title} - Results</h3>
//          <p>Your Score: {score}/{selectedExam.questions.length}</p>
//          <p>Percentage: {((score / selectedExam.questions.length) * 100).toFixed(2)}%</p>
//          <div className="result-buttons">
//            <button className="btn retry-btn" onClick={() => handleExamSelect(selectedExam)}>
//              Retry This Exam
//            </button>
//            <button className="btn new-exam-btn" onClick={resetExam}>
//              Choose Another Exam
//            </button>
//          </div>
//        </div>
//      )}
//    </div>
//  );
//};
//
//export default TakeExam;

///////////////////////////////////////////////////////////////////////////////////////////////////
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./takeExam.css";

const TakeExam = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Fetch all exams when component mounts
  useEffect(() => {
    fetchExams();
  }, []);

  // Timer effect
  useEffect(() => {
    let timer;
    if (selectedExam && timeLeft > 0 && !showResult) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleNext();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, selectedExam, showResult]);

  const fetchExams = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/exams");
      setExams(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch exams. Please try again later.");
      console.error("Error fetching exams:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setAnswers([]);
    setShowResult(false);
    setTimeLeft(60);
    
    // Debug: Log the full structure of the first exam question
    if (exam && exam.questions && exam.questions.length > 0) {
      console.log("First question structure:", JSON.stringify(exam.questions[0], null, 2));
    }
  };

  const handleOptionChange = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    const currentQ = selectedExam.questions[currentQuestion];
    
    // Debug: Log the full structure of the current question
    console.log("Current question structure:", JSON.stringify(currentQ, null, 2));

    if (selectedOption !== null) {
      // Try different potential field names for the correct answer
      // Check which one is defined and use that
      const correctAnswerField = 
        currentQ.answer !== undefined ? "answer" :
        currentQ.correctAnswer !== undefined ? "correctAnswer" :
        currentQ.correctOption !== undefined ? "correctOption" :
        currentQ.correct !== undefined ? "correct" : null;
      
      let isCorrect = false;
      
      if (correctAnswerField) {
        const correctAnswer = currentQ[correctAnswerField];
        
        // Compare as numbers to be safe
        isCorrect = parseInt(selectedOption) === parseInt(correctAnswer);
        
        console.log("Debug info:", {
          selectedOption,
          correctAnswer,
          correctAnswerField,
          isCorrect
        });
        
        if (isCorrect) {
          setScore((prevScore) => prevScore + 1);
        }
        
        setAnswers((prevAnswers) => [
          ...prevAnswers,
          { 
            question: currentQ.question, 
            selectedAnswer: currentQ.options[selectedOption], 
            correctAnswer: currentQ.options[correctAnswer], 
            isCorrect 
          },
        ]);
      } else {
        console.error("Could not find correct answer field in question:", currentQ);
      }
    }

    // Move to next question or show results
    if (currentQuestion < selectedExam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(60);
      setSelectedOption(null);
    } else {
      setShowResult(true);
      // Temporarily comment out submitExam until endpoint is fixed
      // submitExam();
    }
  };

  const submitExam = async () => {
    try {
      // Log what we're trying to submit for debugging
      const submissionData = {
        examId: selectedExam.id,
        answers
      };
      console.log("Attempting to submit:", submissionData);
      
      // Uncomment when your endpoint is ready
      /*
      const response = await axios.post("http://localhost:5001/api/exams/submit", submissionData);
      console.log("Exam Submitted:", response.data);
      */
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  const resetExam = () => {
    setSelectedExam(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setTimeLeft(60);
    setAnswers([]);
  };

  if (loading) {
    return <div className="loading">Loading exams...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="exam-container">
      {!selectedExam ? (
        <div className="subject-selection">
          <h2>Available Exams</h2>
          <div className="subject-buttons">
            {exams.map((exam) => (
              <button
                key={exam.id}
                className="btn subject-btn"
                onClick={() => handleExamSelect(exam)}
              >
                {exam.title} - {exam.subject}
              </button>
            ))}
          </div>
        </div>
      ) : !showResult ? (
        <div className="question-card">
          <div className="exam-header">
            <h3>{selectedExam.subject}</h3>
            <p className="timer">Time Left: {timeLeft}s</p>
          </div>
          
          <div className="question-content">
            <h5>
              Question {currentQuestion + 1} of {selectedExam.questions.length}
            </h5>
            
            <p className="examQuestions">{selectedExam?.questions?.[currentQuestion]?.text || "No question available"}</p>
            <div className="options">
              {selectedExam.questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="option">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="answer"
                    value={index}
                    onChange={() => handleOptionChange(index)}
                    checked={selectedOption === index}
                  />
                  <label htmlFor={`option-${index}`}>{option}</label>
                </div>
              ))}
            </div>

            <button
              className="btn next-btn"
              onClick={handleNext}
              disabled={selectedOption === null}
            >
              {currentQuestion === selectedExam.questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="result-card">
          <h3>{selectedExam.subject} - Results</h3>
          <p>Your Score: {score}/{selectedExam.questions.length}</p>
          <p>Percentage: {((score / selectedExam.questions.length) * 100).toFixed(2)}%</p>

          <div className="result-buttons">
            <button className="btn retry-btn" onClick={() => handleExamSelect(selectedExam)}>
              Retry This Exam
            </button>
            <button className="btn new-exam-btn" onClick={resetExam}>
              Choose Another Exam
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeExam;

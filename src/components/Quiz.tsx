import React, { useRef, useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';
import QuizQuestion from '../core/QuizQuestion';
// Hint: Take advantage of the QuizQuestion interface

// UI only tracks the selected answer and submission status; all quiz logic is handled by QuizCore.
interface QuizState {
  selectedAnswer: string | null
  submitted: boolean
}

const Quiz: React.FC = () => {
  // TODO: Task1 - Seprate the logic of quiz from the UI.
  // Hint: Take advantage of QuizCore to manage quiz state separately from the UI.
  const quizRef = useRef<QuizCore>(new QuizCore()); 
  const quiz = quizRef.current;
  const [state, setState] = useState<QuizState>({
    selectedAnswer: null,
    submitted: false,
  });

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }


  const handleButtonClick = (): void => {
    // TODO: Task3 - Implement the logic for button click ("Next Question" and "Submit").
    // Hint: You might want to check for a function in the core logic to help with this.

    if (!state.selectedAnswer) return;
    quiz.answerQuestion(state.selectedAnswer);

    if (quiz.hasNextQuestion()) {
      quiz.nextQuestion();
      // Reset selected answer for next question
      setState((prev) => ({ ...prev, selectedAnswer: null }));
    } else {
      // Mark quiz as submitted
      setState((prev) => ({ ...prev, submitted: true }));
    }
  } 

  const { selectedAnswer, submitted } = state;
  const currentQuestion: QuizQuestion | null = quiz.getCurrentQuestion();

  // Quiz is submitted or no current question, show final score
  if (submitted || !currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quiz.getScore()} out of {quiz.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>
      
      <button 
        onClick={handleButtonClick}
        disabled={!selectedAnswer}
      >
        {quiz.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
};

export default Quiz;
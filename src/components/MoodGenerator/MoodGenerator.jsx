import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { questions, calculateResult } from '../../data/moodData';
import ResultCard from './ResultCard';
import './MoodGenerator.css';

export default function MoodGenerator() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const questionRef = useRef(null);

  const handleAnswer = useCallback((questionId, value) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        const res = calculateResult(newAnswers);
        setResult(res);
      }
      setIsAnimating(false);
    }, 400);
  }, [answers, currentQuestion, isAnimating]);

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    return <ResultCard result={result} onRestart={handleRestart} />;
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="mood">
      <header className="mood-header">
        <Link to="/" className="mood-back">← Back to Punch's Story</Link>
        <h1 className="mood-title">I Am Punch</h1>
        <p className="mood-subtitle">Find your Punch moment today</p>
      </header>

      <div className="mood-progress">
        <div className="mood-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="mood-question-container" ref={questionRef}>
        <div
          className={`mood-question ${isAnimating ? 'mood-question--exit' : 'mood-question--enter'}`}
          key={question.id}
        >
          <p className="mood-question-number">
            {currentQuestion + 1} of {questions.length}
          </p>
          <h2 className="mood-question-text">{question.question}</h2>

          <div className="mood-options">
            {question.options.map((option) => (
              <button
                key={option.value}
                className="mood-option"
                onClick={() => handleAnswer(question.id, option.value)}
                disabled={isAnimating}
              >
                <span className="mood-option-emoji">{option.emoji}</span>
                <span className="mood-option-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <footer className="mood-footer">
        <p>🐒 Based on the true story of Punch the monkey</p>
      </footer>
    </div>
  );
}

import { useContext } from 'react';
import { QuizContext } from '../contexts/QuizContext';

export function useQuiz() {
  const quizContext = useContext(QuizContext);

  if (!quizContext) throw new Error('Out of Context Provider boundries!');

  return quizContext;
}

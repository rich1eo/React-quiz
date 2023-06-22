import { Action, IQuestion } from '../types/types';
import Options from './Options';

interface QuestionProps {
  question: IQuestion;
  answer: number | null;
  dispatch(action: Action): void;
}

function Question({ question, answer, dispatch }: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}

export default Question;

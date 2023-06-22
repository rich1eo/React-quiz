import { Action, ActionType, IQuestion } from '../types/types';

interface OptionsProps {
  answer: number | null;
  question: IQuestion;
  dispatch(action: Action): void;
}

function Options({ question, answer, dispatch }: OptionsProps) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          key={option}
          className={`btn btn-option ${answer === i ? 'answer' : ''} ${
            hasAnswered
              ? i === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          onClick={() => dispatch({ type: ActionType.NewAnswer, payload: i })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;

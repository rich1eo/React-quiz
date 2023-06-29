import { useQuiz } from '../hooks/useQuiz';
import { ActionType } from '../types/types';

function Options() {
  const { answer, questions, index, dispatch } = useQuiz();

  const question = questions[index];
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

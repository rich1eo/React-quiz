import { useQuiz } from '../hooks/useQuiz';
import { ActionType } from '../types/types';

function NextButton() {
  const { answer, index, numQuestions, dispatch } = useQuiz();

  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ActionType.NextQuestions })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ActionType.Finish })}
      >
        Finish
      </button>
    );

  return null;
}

export default NextButton;

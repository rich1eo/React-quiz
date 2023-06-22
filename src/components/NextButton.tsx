import { Action, ActionType } from '../types/types';

interface NextButtonProps {
  answer: number | null;
  index: number;
  numQuestions: number;
  dispatch(action: Action): void;
}

function NextButton({
  answer,
  index,
  numQuestions,
  dispatch,
}: NextButtonProps) {
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

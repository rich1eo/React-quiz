import { Action, ActionType } from '../types/types';

interface NextButtonProps {
  answer: number | null;
  dispatch(action: Action): void;
}

function NextButton({ answer, dispatch }: NextButtonProps) {
  if (answer === null) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: ActionType.NextQuestions })}
    >
      Next
    </button>
  );
}

export default NextButton;

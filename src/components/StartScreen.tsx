import { Action, ActionType } from '../types/types';

interface StartScreenProps {
  numQuestions: number;
  dispatch(action: Action): void;
}

function StartScreen({ numQuestions, dispatch }: StartScreenProps) {
  function handleStart() {
    dispatch({ type: ActionType.Start });
  }

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleStart}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;

import { useEffect } from 'react';
import { Action, ActionType } from '../types/types';

interface TimerProps {
  secondsRemaining: number | null;
  dispatch(action: Action): void;
}

function Timer({ secondsRemaining, dispatch }: TimerProps) {
  const mins = Math.floor(secondsRemaining! / 60);
  const seconds = secondsRemaining! % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: ActionType.Tick });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && '0'}
      {mins}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
}

export default Timer;

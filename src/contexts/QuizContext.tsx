import { ReactNode, createContext, useEffect, useReducer } from 'react';
import {
  IQuiz,
  StatusType,
  Action,
  ActionType,
  IQuestion,
} from '../types/types';

const SECS_PER_QUESTION = 30;

type QuizContextType = {
  questions: IQuestion[];
  status: StatusType;
  index: number;
  answer: null | number;
  points: number;
  highScore: number;
  secondsRemaining: number | null;
  numQuestions: number;
  maxPoints: number;
  dispatch(action: Action): void;
};

export const QuizContext = createContext<QuizContextType | null>(null);

const initialState: IQuiz = {
  questions: [],
  status: StatusType.Loading,
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state: IQuiz, action: Action): IQuiz {
  switch (action.type) {
    case ActionType.DataReceived:
      return {
        ...state,
        questions: action.payload,
        status: StatusType.Ready,
      };

    case ActionType.DataFailed:
      return {
        ...state,
        status: StatusType.Error,
      };

    case ActionType.Start:
      return {
        ...state,
        status: StatusType.Active,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case ActionType.NewAnswer:
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      };

    case ActionType.NextQuestions:
      return {
        ...state,
        index: state.index++,
        answer: null,
      };

    case ActionType.Finish:
      return {
        ...state,
        status: StatusType.Finished,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case ActionType.Restart:
      return {
        ...initialState,
        questions: state.questions,
        status: StatusType.Ready,
        highScore: state.highScore,
      };

    case ActionType.Tick:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining! - 1,
        status:
          state.secondsRemaining! > 0 ? state.status : StatusType.Finished,
      };

    default:
      throw new Error('Unknow action 🙁');
  }
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then((data: IQuestion[]) =>
        dispatch({ type: ActionType.DataReceived, payload: data })
      )
      .catch(() => dispatch({ type: ActionType.DataFailed }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        answer,
        highScore,
        index,
        points,
        questions,
        secondsRemaining,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

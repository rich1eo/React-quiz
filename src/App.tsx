import { useEffect, useReducer } from 'react';
import { Action, ActionType, IQuestion, Quiz, StatusType } from './types/types';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';

const initialState: Quiz = {
  questions: [],
  status: StatusType.Loading,
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

function reducer(state: Quiz, action: Action): Quiz {
  switch (action.type) {
    case ActionType.DataReceived:
      return {
        ...state,
        questions: action.payload,
        status: StatusType.Ready,
      };

    case ActionType.DataFailed:
      return { ...state, status: StatusType.Error };

    case ActionType.Start:
      return { ...state, status: StatusType.Active };

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

    default:
      throw new Error('Unknow action 🙁');
  }
}

function App() {
  const [{ questions, status, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        if (!res.ok) throw new Error('Something went wrong');

        const data: IQuestion[] = await res.json();
        dispatch({ type: ActionType.DataReceived, payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: ActionType.DataFailed });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === StatusType.Loading && <Loader />}
        {status === StatusType.Error && <ErrorMessage />}
        {status === StatusType.Ready && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === StatusType.Active && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextButton
              answer={answer}
              index={index}
              numQuestions={numQuestions}
              dispatch={dispatch}
            />
          </>
        )}
        {status === StatusType.Finished && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

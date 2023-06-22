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
import Footer from './components/Footer';
import Timer from './components/Timer';

const SECS_PER_QUESTION = 30;

const initialState: Quiz = {
  questions: [],
  status: StatusType.Loading,
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
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

function App() {
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
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                answer={answer}
                index={index}
                numQuestions={numQuestions}
                dispatch={dispatch}
              />
            </Footer>
          </>
        )}
        {status === StatusType.Finished && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

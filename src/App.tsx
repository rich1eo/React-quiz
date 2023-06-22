import { useEffect, useReducer } from 'react';
import { Action, ActionType, IQuestion, Quiz, StatusType } from './types/types';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import StartScreen from './components/StartScreen';
import Question from './components/Question';

const initialState: Quiz = {
  questions: [],
  status: StatusType.Loading,
  index: 0,
  answer: null,
  points: 0,
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

    default:
      throw new Error('Unknow action 🙁');
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;

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
          <Question
            question={questions[index]}
            answer={answer}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

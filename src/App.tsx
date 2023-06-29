import { StatusType } from './types/types';
import { useQuiz } from './hooks/useQuiz';

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

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === StatusType.Loading && <Loader />}
        {status === StatusType.Error && <ErrorMessage />}
        {status === StatusType.Ready && <StartScreen />}
        {status === StatusType.Active && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === StatusType.Finished && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;

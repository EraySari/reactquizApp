import Header from "./Header";
import Main from "./Main";
import Start from "./Start";
import Loader from "./Loader";
import Questions from "./Questions";
import Result from "./Result";

import Progress from "./Progress";
import Footer from "./Footer";
import NextButton from "./NextButton";
import Timer from "./Timer";

import { useQuiz } from "./QuizContext";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Loader />}
        {status === "ready" && <Start />}
        {status === "active" && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finish" && <Result />}
      </Main>
    </div>
  );
}

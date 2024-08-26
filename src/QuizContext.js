import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
const SECS_PER_QUESTION = 3;

const initialState = {
  questions: [],
  status: "loading",
  answer: null,
  questionNum: 0,
  point: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload }; //state'i döndür ama ataus ve payloadi degistir anlaminda

    case "error":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions.at(state.questionNum);

      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correctOption
            ? state.point + question.points
            : state.point,
      };

    case "nextQuestion":
      return { ...state, questionNum: state.questionNum + 1, answer: null };

    case "increase":
      return { ...state, questionNum: state.questionNum + action.payload };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.point > state.highscore ? state.point : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      questionNum,
      answer,
      point,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestion = questions.length;

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "error" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        questionNum,
        answer,
        point,
        highscore,
        secondsRemaining,
        numQuestion,
        maxPossiblePoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };

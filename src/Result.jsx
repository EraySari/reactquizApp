import { useQuiz } from "./QuizContext";

function Result() {
  const { point, highscore, dispatch, maxPossiblePoint } = useQuiz();
  return (
    <>
      <p className="result">
        You scored {point} out of {maxPossiblePoint}
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default Result;

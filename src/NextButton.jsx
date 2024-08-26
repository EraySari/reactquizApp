import { useQuiz } from "./QuizContext";

function NextButton() {
  const { questionNum, dispatch, numQuestion, answer } = useQuiz();

  return (
    <div>
      {answer !== null ? (
        <button
          className="btn btn-ui"
          onClick={() => {
            if (questionNum < numQuestion - 1) {
              dispatch({ type: "nextQuestion" });
            }
            if (questionNum === numQuestion - 1) dispatch({ type: "finish" });
          }}
        >
          Next
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default NextButton;

import { useQuiz } from "./QuizContext";

function Option({ question }) {
  const { dispatch, answer } = useQuiz();

  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: index });
          }}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;

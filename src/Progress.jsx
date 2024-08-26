import { useQuiz } from "./QuizContext";

function Progress() {
  const { questionNum, point, numQuestion, maxPossiblePoints } = useQuiz();

  return (
    <header className="progress">
      <>
        <progress max={numQuestion} value={questionNum + 1}></progress>
        <p>
          Questions {questionNum + 1} / {numQuestion}
        </p>
        <p>
          <strong>{point}</strong> / {maxPossiblePoints} points
        </p>
      </>
    </header>
  );
}

export default Progress;

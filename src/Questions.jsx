import { useQuiz } from "./QuizContext";
import Option from "./Option";

function Questions() {
  const { questions, questionNum } = useQuiz();

  const question = questions.at(questionNum);
  return (
    <>
      <div>
        <h4>{question.question}</h4>
        <Option question={question} />
      </div>
    </>
  );
}

export default Questions;

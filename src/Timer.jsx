import { useEffect } from "react";
import { useQuiz } from "./QuizContext";

function Timer() {
  const { secondsRemaining, dispatch } = useQuiz();

  const min = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id); // Timer unmount yani DOMdan cikarilirken(isimiz bittiginde)
      //Her defasında useEffect tekrar çalışmadan önce,
      //bir önceki useEffect'in temizlik işlemi (return içindeki fonksiyon)
      //çalıştırılır. Bu, event listener'ları kaldırmak
      //veya önceki efektin etkilerini temizlemek gibi işlemler için kullanışlıdır.
      //yani kullanmasaydik 5 tane re-render islemi olsaydi 5 farkli timer olacakti. Yani bir önceki islemin etkilerini kaldiriyoruz
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;

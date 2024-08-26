import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import "./index.css";
import { QuizProvider } from "./QuizContext";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);

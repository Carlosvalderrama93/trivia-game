import db from "./questions.js";
import { useState, useEffect } from "react";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(0);
  const [points, setPoints] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isStarted) {
    console.log("StartGame Componet --->");
    return (
      <StartGame setIsStarted={setIsStarted} setIsFinished={setIsFinished} />
    );
  } else if (isStarted && !isFinished) {
    console.log("Question and Responses Components --->");
    return (
      <main>
        <h2>Trivia Game</h2>
        <div className="questions-container">
          <Questions nextQuestion={nextQuestion} />
        </div>
        <div>
          <Responses
            nextQuestion={nextQuestion}
            setNextQuestion={setNextQuestion}
            answerNumber={0}
            points={points}
            setPoints={setPoints}
            setIsFinished={setIsFinished}
          />
          <Responses
            nextQuestion={nextQuestion}
            setNextQuestion={setNextQuestion}
            answerNumber={1}
            points={points}
            setPoints={setPoints}
          />
          <Responses
            nextQuestion={nextQuestion}
            setNextQuestion={setNextQuestion}
            answerNumber={2}
            points={points}
            setPoints={setPoints}
          />
          <Responses
            nextQuestion={nextQuestion}
            setNextQuestion={setNextQuestion}
            answerNumber={3}
            points={points}
            setPoints={setPoints}
          />
        </div>
        <div>
          <h1>Points</h1>
          <p>{points}</p>
        </div>
      </main>
    );
  } else if (isFinished) {
    console.log("EndGame Componet --->");
    return (
      <EndGame
        setIsStarted={setIsStarted}
        points={points}
        setNextQuestion={setNextQuestion}
      />
    );
  }
}

function StartGame({ setIsStarted, setIsFinished }) {
  let message = <p>Do you want to play?</p>;
  let boton = (
    <button
      onClick={() => {
        setIsStarted(true);
        setIsFinished(false);
      }}
    >
      {" "}
      Yes, I want to play{" "}
    </button>
  );
  return (
    <div>
      {message}
      {boton}
    </div>
  );
}

function EndGame({ setIsStarted, points, setNextQuestion }) {
  let message = <p>Your puntation was {points}</p>;
  let boton = (
    <button
      onClick={() => {
        setIsStarted(false);
        setNextQuestion(0);
      }}
    >
      {" "}
      Play Again{" "}
    </button>
  );
  return (
    <div>
      {message}
      {boton}
    </div>
  );
}

function Questions({ nextQuestion }) {
  return (
    <div>
      <div className="question">
        <p>{db[nextQuestion].question}</p>
      </div>
      <div>Other</div>
    </div>
  );
}

function Responses({
  nextQuestion,
  setNextQuestion,
  answerNumber,
  points,
  setPoints,
  setIsFinished,
}) {
  if (2 === nextQuestion) {
    setIsFinished(true);
  }
  return (
    <div>
      <div className="Responses">
        <button
          onClick={() => {
            setNextQuestion(nextQuestion + 1);
            puntation(
              db[nextQuestion].options[answerNumber].isCorrect,
              setPoints,
              points
            );
          }}
        >
          {db[nextQuestion].options[answerNumber].response}
        </button>
      </div>
    </div>
  );
}

function puntation(isCorrect, setPoints, points) {
  if (isCorrect) {
    setPoints(points + 1);
  }
}

export default App;

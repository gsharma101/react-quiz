import { useEffect, useReducer } from "react";
import Mainsection from "./Mainsection";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  // 'Loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    default:
      throw new Error("Action unknown");
  }
}

const App = () => {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const {question, status} = state;

  const numQuestions = questions.length;

  useEffect(function () {
    /*
    async function getData() {
      const res = await fetch("http://localhost:9000/questions");
      const data = await res.json();
      dispatch({ type: "dataReceived", payload: data });
    }
      */
    async function getData() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally, you can dispatch an error action to handle it in your state management
        dispatch({ type: "dataFailed" });
      }
    }

    getData();
  }, []);
  return (
    <div className="app">
      <Header />

      <Mainsection>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Mainsection>
    </div>
  );
};

export default App;

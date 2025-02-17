import Mainsection from "./Mainsection";
import Header from "./Header";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  // 'Loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        state: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        state: "error",
      };
    default:
      throw new Error("Action unknown");
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        dispatch({ type: "dataError"});
      }
    }

    getData();
  }, []);
  return (
    <div>
      <Header />
      <Mainsection className="main">
        <p>1/15</p>
        <p>Question?</p>
      </Mainsection>
    </div>
  );
};

export default App;

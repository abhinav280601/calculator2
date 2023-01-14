import "./App.css";
import { NumberFormatBase, NumericFormat } from "react-number-format";
import { useState, useEffect, useCallback } from "react";
import ReactCardFlip from "react-card-flip";
function App() {
  const [flip, setFlip] = useState(false);
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [curStateKey, setCurStateKey] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const isNumberPressed = (key) => {
    if (
      key === "1" ||
      key === "2" ||
      key === "3" ||
      key === "4" ||
      key === "5" ||
      key === "6" ||
      key === "7" ||
      key === "8" ||
      key === "9" ||
      key === "0" ||
      key === "."
    ) {
      return true;
    }
  };

  const isOperatorPressed = (key) => {
    if (key === "+" || key === "-" || key === "*" || key === "/") {
      return true;
    }
  };
  const handleKeyPress = useCallback((event) => {
    const num = event.key;
    console.log(event);
    if (isNumberPressed(num)) inputNumKey(event);
    if (isOperatorPressed(num)) operatorTypekey(event);
    if (event.key == "Enter") equalsKey(event);
    if (event.key == "Escape") reset();
  });
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const inputNum = (e) => {
    console.log(curState);
    if (curState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreState("");
    }

    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
    setTotal(false);
  };
  // InputNum for keypress
  const inputNumKey = (event) => {
    if (curState.includes(".") && event.key === ".") return;

    if (total) {
      setPreState("");
    }

    curState ? setCurState((pre) => pre + event.key) : setCurState(event.key);
    console.log(curState);
    setTotal(false);
  };

  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput("0");
  }, []);

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };
  // operatorType for Keypress
  const operatorTypekey = (event) => {
    setTotal(false);
    setOperator(event.key);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    console.log(operator);
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;
      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      case "x":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };

  // equals for key
  const equalsKey = (event) => {
    if (event.key === "=" || event.key === "Enter") {
      setTotal(true);
    }

    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;
      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      case "x":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "*":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };

  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };

  return (
    <div className="u_container">
      <div className="container">
        {/* <ReactCardFlip isFlipped={flip} flipDirection="vertical"> */}
        <div className="wrapper">
          <div className="screen">
            <div className="input_container">
              <div class="lcd-background">888888888888</div>
              {input !== "" || input === "0" ? (
                <NumericFormat
                  value={input}
                  displayType={"text"}
                  thousandSeparator={false}
                />
              ) : (
                <NumericFormat
                  value={preState}
                  displayType={"text"}
                  thousandSeparator={false}
                />
              )}
            </div>
          </div>
          <div className="btn" onClick={inputNum}>
            7
          </div>
          <div className="btn" onClick={inputNum}>
            8
          </div>
          <div className="btn" onClick={inputNum}>
            9
          </div>
          <div className="btn orange" onClick={reset}>
            C
          </div>
          <div className="btn" onClick={inputNum}>
            4
          </div>
          <div className="btn" onClick={inputNum}>
            5
          </div>
          <div className="btn" onClick={inputNum}>
            6
          </div>
          <div className="btn" onClick={operatorType}>
            -
          </div>
          <div className="btn" onClick={inputNum}>
            1
          </div>
          <div className="btn" onClick={inputNum}>
            2
          </div>
          <div className="btn" onClick={inputNum}>
            3
          </div>
          <div className="btn" onClick={operatorType}>
            +
          </div>
          <div className="btn" onClick={operatorType}>
            /
          </div>
          <div className="btn zero" onClick={inputNum}>
            0
          </div>
          <div className="btn" onClick={operatorType}>
            x
          </div>
          <div className="btn" onClick={equals}>
            =
          </div>
          <button className="btn history" onClick={() => setFlip(!flip)}>
            History
          </button>
        </div>

        {/* <div className="container_flip">
            <div className="display_container">
              <p>HISTORY</p>
            </div>
            <button className="btn back" onClick={() => setFlip(!flip)}>
              back
            </button>
          </div>
        </ReactCardFlip> */}
      </div>
    </div>
  );
}

export default App;

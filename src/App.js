import "./App.css";
import { NumericFormat } from "react-number-format";
import { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";

function App() {
  const [flip, setFlip] = useState(false);
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const inputNum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreState("");
    }

    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
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

  const equals = (e) => {
    if (e?.target.innerText === "=") {
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
        <ReactCardFlip isFlipped={flip} flipDirection="vertical">
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
            <button className="btn" onClick={() => setFlip(!flip)}>
              History
            </button>
          </div>

          <div className="wrapper">
            <button className="btn" onClick={() => setFlip(!flip)}>
              History
            </button>
          </div>
        </ReactCardFlip>
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import { NumberFormatBase, NumericFormat } from "react-number-format";
import { useState, useEffect, useCallback } from "react";
import ReactCardFlip from "react-card-flip";

function App() {
  const [flip, setFlip] = useState(false);
  const [preState, setPreState] = useState("");
  const [calculation, setCalculation] = useState("");
  const [calculationArray, setCalculationArray] = useState([]);
  const [curState, setCurState] = useState("");
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
    if (isNumberPressed(num)) inputNumKey(event);
    if (isOperatorPressed(num)) operatorTypekey(event);
    if (event.key === "Enter") equalsKey(event);
    if (event.key === "Escape") reset();
  });
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
  // InputNum for keypress
  const inputNumKey = (event) => {
    if (curState.includes(".") && event.key === ".") return;

    if (total) {
      setPreState("");
    }

    curState ? setCurState((pre) => pre + event.key) : setCurState(event.key);
    setTotal(false);
  };

  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setCalculationArray(calculationArray);
  }, [calculationArray]);

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
    let cal;
    var calculation;
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
    switch (operator) {
      case "/":
        calculation = preState + "/" + curState;
        break;
      case "+":
        calculation = preState + "+" + curState;
        break;
      case "-":
        calculation = preState + "-" + curState;
        break;
      case "x":
        calculation = preState + "*" + curState;
        break;
      default:
        return;
    }
    calculation = calculation + " = " + cal;
    setCalculation(calculation);
    calculationArray.push(calculation);
    setCalculationArray(calculationArray);
    setData(calculationArray);
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
    var calculation;
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
    switch (operator) {
      case "/":
        calculation = preState + "/" + curState;
        break;
      case "+":
        calculation = preState + "+" + curState;
        break;
      case "-":
        calculation = preState + "-" + curState;
        break;
      case "x":
        calculation = preState + "*" + curState;
        break;
      default:
        return;
    }
    calculation = calculation + " = " + cal;
    setCalculation(calculation);
    setData(calculation);
    setInput("");
    setPreState(cal);
    setCurState("");
  };

  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };
  const setData = (cal) => {
    console.log(cal);
    localStorage.setItem("data", cal);
  };
  const getData = () => {
    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    console.log(data);
    return data;
  };
  const history = () => {
    let data = getData();
    setCalculationArray(data);
  };
  const renderList = calculationArray.map((item, index) => (
    <div key={index}>{item}</div>
  ));

  const clear_h = () => {
    setCalculationArray([]);
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
            <button
              className="btn history"
              onClick={() => {
                setFlip(!flip);
                history();
              }}
            >
              History
            </button>
          </div>

          <div className="container_flip">
            <div className="display_container">
              <p>{renderList}</p>
            </div>
            <button className="btn back" onClick={() => setFlip(!flip)}>
              back
            </button>
            <button className="btn" onClick={clear_h}>
              clear
            </button>
          </div>
        </ReactCardFlip>
      </div>
    </div>
  );
}

export default App;

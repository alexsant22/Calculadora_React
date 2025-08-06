import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const append = (value) => setDisplay((prev) => prev + value);
  const clearDisplay = () => setDisplay("");
  
  const calculate = () => {
    try {
      // Verifica se há uma divisão por zero
      if (display.includes("/0") && !display.includes("/0.")) {
        setDisplay("Não pode dividir por zero");
        return;
      }
      
      const result = eval(display).toString();
      setDisplay(result);
    } catch {
      setDisplay("Erro");
    }
  };

  const handlePercentage = () => {
    try {
      const value = parseFloat(display);
      if (!isNaN(value)) {
        setDisplay((value / 100).toString());
      }
    } catch {
      setDisplay("Erro");
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={`calculator ${darkMode ? "dark" : "light"}`}>
      <button className="toggle-theme" onClick={toggleDarkMode}>
        {darkMode ? "Modo Claro" : "Modo Escuro"}
      </button>

      <input type="text" value={display} disabled />

      <div className="buttons">
        <button onClick={clearDisplay}>C</button>
        <button onClick={() => append("/")}>/</button>
        <button onClick={() => append("*")}>*</button>
        <button onClick={() => append("-")}>-</button>

        <button onClick={() => append("7")}>7</button>
        <button onClick={() => append("8")}>8</button>
        <button onClick={() => append("9")}>9</button>
        <button onClick={() => append("+")}>+</button>

        <button onClick={() => append("4")}>4</button>
        <button onClick={() => append("5")}>5</button>
        <button onClick={() => append("6")}>6</button>
        <button onClick={calculate}>=</button>

        <button onClick={() => append("1")}>1</button>
        <button onClick={() => append("2")}>2</button>
        <button onClick={() => append("3")}>3</button>
        <button onClick={handlePercentage}>%</button>

        <button onClick={() => append("0")}>0</button>
        <button onClick={() => append(".")}>.</button>
      </div>
    </div>
  );
}

export default App;
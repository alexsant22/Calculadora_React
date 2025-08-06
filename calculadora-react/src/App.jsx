import { useState } from "react";
import "./App.css";
import { evaluate } from "mathjs";

function App() {
  const [display, setDisplay] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const append = (value) => {
    const operators = ["/", "*", "-", "+"];
    const lastChar = display.slice(-1);

    // Previne operadores consecutivos
    if (operators.includes(value) && operators.includes(lastChar)) {
      return;
    }

    // Impede que a expressão comece com um operador (exceto o sinal de menos)
    if (display === "" && operators.includes(value) && value !== "-") {
      return;
    }
    setDisplay((prev) => prev + value);
  };

  const clearDisplay = () => setDisplay("");

  const calculate = () => {
    // Evita erro ao tentar calcular uma string vazia ou apenas um operador
    if (!display || (isNaN(display.slice(-1)) && display.slice(-1) !== ".")) {
      return;
    }
    try {
      // Avalia a expressão matemática
      const result = evaluate(display);
      setDisplay(result.toString());
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

      <input type="text" value={display} disabled readOnly />

      <div className="buttons">
        <button onClick={clearDisplay}>C</button>
        <button onClick={() => append("/")}>/</button>
        <button onClick={() => append("*")}>*</button>
        <button onClick={() => append("-")}>-</button>

        <button onClick={() => append("7")}>7</button>
        <button onClick={() => append("8")}>8</button>
        <button onClick={() => append("9")}>9</button>
        <button onClick={() => append("+")} style={{ gridRow: "span 2" }}>
          +
        </button>

        <button onClick={() => append("4")}>4</button>
        <button onClick={() => append("5")}>5</button>
        <button onClick={() => append("6")}>6</button>

        <button onClick={() => append("1")}>1</button>
        <button onClick={() => append("2")}>2</button>
        <button onClick={() => append("3")}>3</button>

        <button onClick={() => append("0")} className="zero">
          0
        </button>
        <button onClick={() => append(".")}>.</button>
        <button onClick={calculate} className="equals">
          =
        </button>
      </div>
    </div>
  );
}

export default App;

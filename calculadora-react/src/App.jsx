import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Função para avaliar expressões matemáticas de forma segura
  const evaluate = (expression) => {
    try {
      // Verifica se há uma divisão por zero
      if (expression.includes("/0") && !expression.includes("/0.")) {
        return "Não pode dividir por zero";
      }
      
      // Substitui a função eval por uma avaliação mais segura
      return Function(`'use strict'; return (${expression})`)();
    } catch {
      return "Erro";
    }
  };

  const append = (value) => setDisplay((prev) => prev + value);
  const clearDisplay = () => setDisplay("");
  
  const calculate = () => {
    const result = evaluate(display);
    setDisplay(result.toString());
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

  // Efeito para lidar com eventos do teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      
      // Mapeamento de teclas para funções
      const keyMap = {
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
        '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
        '+': '+', '-': '-', '*': '*', '/': '/', '.': '.',
        '%': handlePercentage,
        'Enter': calculate,
        '=': calculate,
        'Escape': clearDisplay,
        'Backspace': () => setDisplay(prev => prev.slice(0, -1))
      };

      if (key in keyMap) {
        e.preventDefault();
        const action = keyMap[key];
        
        if (typeof action === 'function') {
          action();
        } else {
          append(action);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display]);

  return (
    <div className={`calculator ${darkMode ? "dark" : "light"}`}>
      <button className="toggle-theme" onClick={toggleDarkMode}>
        {darkMode ? "Modo Claro" : "Modo Escuro"}
      </button>

      <div className="input-container">
        <input 
          type="text" 
          value={display} 
          disabled 
          className="calculator-input"
        />
      </div>

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
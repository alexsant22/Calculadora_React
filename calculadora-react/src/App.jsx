import { useState } from "react";

function App() {
  const [valor1, setValor1] = useState(0);
  const [valor2, setValor2] = useState(0);
  const [valor3, setValor3] = useState(0);
  const [altura, setAltura] = useState(0);
  const [peso, setPeso] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [resultadoImc, setResultadoImc] = useState(null);

  const somar = () => {
    setResultado(valor1 + valor2 + valor3);

    if (setResultado === null) {
      alert("Resultado nulo, tente novamente!");
    }
  };

  const subtrair = () => {
    setResultado(valor1 - valor2 - valor3);

    if (setResultado === null) {
      alert("Resultado nulo, tente novamente!");
    }
  };

  const multiplicar = () => {
    if (valor3 === null || valor3 === 0) {
      setResultado(valor1 * valor2);
    } else {
      setResultado(valor1 * valor2 * valor3);
    }

    if (setResultado === null) {
      alert("Resultado nulo, tente novamente!");
    }
  };

  const dividir = () => {
    if (valor3 === null || valor3 === 0) {
      setResultado(valor1 / valor2);
    } else {
      setResultado(valor1 / valor2 / valor3);
    }

    if (setResultado === null) {
      alert("Resultado nulo, tente novamente!");
    }
  };

  const imc = () => {
    if (peso <= 0 || altura <= 0) {
      alert("Peso ou altura inválidos!");
      return;
    }

    const alturaMetros = altura / 100;
    const imcCalculado = peso / (alturaMetros * alturaMetros);
    setResultadoImc(imcCalculado);
  };

  const getImcStatus = (imc) => {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 24.9) return "Peso normal";
    if (imc < 29.9) return "Sobrepeso";
    return "Obesidade";
  };

  return (
    <div style={{ padding: "2rem 2rem 2rem 1rem", fontFamily: "Arial" }}>
      <h2>Calcular valores:</h2>
      <input
        type="number"
        placeholder="Valor 1..."
        onChange={(e) => setValor1(Number(e.target.value))}
      />

      <span style={{ margin: "0 10px" }}></span>

      <input
        type="number"
        placeholder="Valor 2..."
        onChange={(e) => setValor2(Number(e.target.value))}
      />

      <span style={{ margin: "0 10px" }}></span>

      <input
        type="number"
        placeholder="Valor 3..."
        onChange={(e) => setValor3(Number(e.target.value))}
      />

      <button onClick={somar} style={{ marginTop: "20px", marginLeft: "10px" }}>
        Somar
      </button>

      <button
        onClick={subtrair}
        style={{ marginTop: "20px", marginLeft: "10px" }}
      >
        Subtrair
      </button>

      <button
        onClick={multiplicar}
        style={{ marginTop: "20px", marginLeft: "10px" }}
      >
        Multiplicar
      </button>

      <button
        onClick={dividir}
        style={{ marginTop: "20px", marginLeft: "10px" }}
      >
        Dividir
      </button>

      {resultado !== null && (
        <h2 style={{ marginTop: "20px" }}>Resultado: {resultado.toFixed(2)}</h2>
      )}

      <br />
      <br />
      <h3>Calcular IMC:</h3>

      <input
        type="number"
        placeholder="Peso (kg)"
        onChange={(e) => setPeso(Number(e.target.value))}
      />

      <span style={{ margin: "0 10px" }}></span>

      <input
        type="number"
        placeholder="Altura (cm)"
        onChange={(e) => setAltura(Number(e.target.value))}
      />

      <button onClick={imc} style={{ marginTop: "20px", marginLeft: "10px" }}>
        Calcular
      </button>

      {resultadoImc !== null && (
        <h2 style={{ marginTop: "20px" }}>
          IMC: {resultadoImc.toFixed(2)} - {getImcStatus(resultadoImc)}
        </h2>
      )}
    </div>
  );
}

export default App;

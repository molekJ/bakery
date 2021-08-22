import { ProgressBar } from "./Components/ProgressBar";
import { useState, useEffect } from "react";
import { DisplayAmount } from "./Components/DisplayAmount";
import { DoughShelf } from "./Components/DoughShelf";
import { Oven } from "./Components/Oven";
import { GlobalStyle } from "./GlobalStyles";

function App() {
  const [flourAmount, setFlourAmount] = useState<number>(40);
  const [progresDought, setProgresDought] = useState<number>(0);
  const [isMakingDought, setisMakingDought] = useState<boolean>(false);
  const [doughtAmount, setDoughtAmount] = useState<number>(0);
  const [doughtArray, setDoughtArray] = useState<number[]>([]);
  const [rowCookie, setRowCookie] = useState<number>(0);
  const [cookiesInOven, setCookiesInOven] = useState<number>(0);

  useEffect(() => {
    if (flourAmount < 10) {
      setisMakingDought(false);
      return;
    }
    if (isMakingDought) {
      if (progresDought === 100) {
        setProgresDought(0);
        setDoughtAmount(doughtAmount + 1);
        setFlourAmount(flourAmount - 10);
        setDoughtArray((doughtArray) => [...doughtArray, 1]);

        return;
      }
      setTimeout(() => {
        return setProgresDought(progresDought + 1);
      }, 10);
    }
  }, [progresDought, isMakingDought]);

  return (
    <div className="App">
      <GlobalStyle />
      <h1>BACERY</h1>
      <ProgressBar progressValue={progresDought} />
      <DisplayAmount
        amount={flourAmount}
        nameAmount={"Ilość dostępnej mąki:"}
        type={"kg"}
      />
      <button
        disabled={flourAmount < 10 ? true : false}
        onClick={() => {
          setisMakingDought(!isMakingDought);
        }}
      >
        {isMakingDought ? "Zatrzymaj lepienie" : "Ulep ciasto"}
      </button>
      <DisplayAmount
        amount={doughtAmount}
        nameAmount={"liczba ulepionych kul"}
        type={"szt"}
      />
      <DisplayAmount
        amount={rowCookie}
        nameAmount={"Ilość surowych ciasteczek:"}
        type={"szt"}
      />
      {doughtArray.map((e, index, array) => {
        return (
          <>
            <DoughShelf
              key={index}
              setState={setRowCookie}
              rowCookie={rowCookie}
              setDoughtArray={setDoughtArray}
              doughtArray={doughtArray}
              index={index}
            />
          </>
        );
      })}

      <button
        onClick={() => {
          setCookiesInOven(cookiesInOven + 1);
        }}
      >
        Włóż ciastko do pieca
      </button>
      <DisplayAmount
        amount={cookiesInOven}
        nameAmount={"ilosc ciastek w piekarniku"}
        type={"szt"}
      />
      <Oven></Oven>
    </div>
  );
}

export default App;

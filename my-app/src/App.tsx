import { ProgressBar } from "./Components/ProgressBar";
import { useState, useEffect } from "react";
import { DisplayAmount } from "./Components/DisplayAmount";
import { DoughShelf } from "./Components/DoughShelf";
import { Oven } from "./Components/Oven";
import { GlobalStyle } from "./GlobalStyles";
import { Dough } from "./Components/Dought";
import { Cookie } from "./Components/Cookie";

function App() {
  const [flourAmount, setFlourAmount] = useState<number>(40);
  const [progresDought, setProgresDought] = useState<number>(0);
  const [isMakingDought, setisMakingDought] = useState<boolean>(false);
  const [doughtAmount, setDoughtAmount] = useState<number>(0);
  const [doughtArray, setDoughtArray] = useState<Dough[]>([]);
  const [rawCookie, setRawCookie] = useState<number>(0);
  const [cookiesInOven, setCookiesInOven] = useState<number>(0);
  const [cookiesInOvenArray, setCookiesInOvenArray] = useState<Cookie[]>([]);

  const makeCookie = (doughId: number) => {
    setDoughtArray((old) =>
      old
        .map((dough) =>
          dough.id !== doughId ? dough : { ...dough, size: dough.size - 10 }
        )
        .filter((dough) => dough.size > 0)
    );
    setRawCookie((old) => old + 1);
  };

  const cookiesBakingStart = () => {
    setCookiesInOven((cookiesInOven) => cookiesInOven + 1);
    setRawCookie((rawCookie) => rawCookie - 1);

    setCookiesInOvenArray((cookiesInOvenArray) => [
      ...cookiesInOvenArray,
      { id: Date.now(), date: 2 },
    ]);
  };

  useEffect(() => {
    if (flourAmount < 10) {
      setisMakingDought(false);
      return;
    }
    let timeoutId = 0;
    if (isMakingDought) {
      if (progresDought === 100) {
        setProgresDought(0);
        setDoughtAmount((doughtAmount) => doughtAmount + 1);
        setFlourAmount((flourAmount) => flourAmount - 10);
        setDoughtArray((doughtArray) => [
          ...doughtArray,
          { id: Date.now(), size: 100 },
        ]);

        return;
      }
      timeoutId = window.setTimeout(() => {
        return setProgresDought(progresDought + 1);
      }, 10);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
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
        amount={rawCookie}
        nameAmount={"Ilość surowych ciasteczek:"}
        type={"szt"}
      />
      {doughtArray.map((element) => {
        return (
          <DoughShelf
            key={element.id}
            size={element.size}
            onDoughClick={() => makeCookie(element.id)}
          />
        );
      })}

      <button
        disabled={
          rawCookie < 1 ? true : false || cookiesInOven === 9 ? true : false
        }
        onClick={() => {
          cookiesBakingStart();
        }}
      >
        Włóż ciastko do pieca
      </button>
      <DisplayAmount
        amount={cookiesInOven}
        nameAmount={"ilosc ciastek w piekarniku"}
        type={"szt"}
      />
      <Oven cookiesInOvenArray={cookiesInOvenArray}></Oven>
    </div>
  );
}

export default App;

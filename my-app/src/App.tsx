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
  const [cookiesInOvenArray, setCookiesInOvenArray] = useState<Cookie[]>([]);
  const [cookiesReadyToSell, setCookiesReadyToSell] = useState<number>(0);
  const [ourMoney, setOurMoney] = useState<number>(0);
  const [sell, setSell] = useState(false);

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
    setRawCookie((rawCookie) => rawCookie - 1);

    setCookiesInOvenArray((cookiesInOvenArray) => [
      ...cookiesInOvenArray,
      { id: Date.now(), color: "yellow", place: "oven" },
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

  useEffect(() => {
    const date = Date.now();
    if (cookiesInOvenArray.length === 0) return;

    setCookiesInOvenArray((old) =>
      old.map((cookie) =>
        date - cookie.id > 3000 ? { ...cookie, color: "orange" } : cookie
      )
    );
    setCookiesInOvenArray((old) =>
      old.map((cookie) =>
        date - cookie.id > 6000 ? { ...cookie, color: "brown" } : cookie
      )
    );
    setCookiesInOvenArray((old) =>
      old.map((cookie) =>
        date - cookie.id > 9000 ? { ...cookie, color: "black" } : cookie
      )
    );
    setCookiesInOvenArray((old) =>
      old.filter((cookie) => date - cookie.id < 12000)
    );
  });

  const randomAmount = () => {
    let number = Math.floor(Math.random() * 10 + 1);
    return number;
  };

  const sellCookies = () => {
    let amount = randomAmount();
    if (cookiesReadyToSell === 0) {
      return;
    }
    if (amount >= cookiesReadyToSell) {
      amount = cookiesReadyToSell;
      setCookiesReadyToSell(0);
      if (amount > 5) {
        setOurMoney((ourMoney) => ourMoney + amount * 4);
      } else {
        setOurMoney((ourMoney) => ourMoney + amount * 5);
      }
      return;
    } else {
      setCookiesReadyToSell(cookiesReadyToSell - amount);
      if (amount > 5) {
        setOurMoney((ourMoney) => ourMoney + amount * 4);
      } else {
        setOurMoney((ourMoney) => ourMoney + amount * 5);
      }
      return;
    }
  };

  const randomSecound = () => {
    let number = Math.floor(Math.random() * 4 + 3);
    return number;
  };

  useEffect(() => {
    if (sell) {
      return;
    } else {
      const secounds = randomSecound();
      const timeoutId = window.setTimeout(() => {
        console.log("srzedaje");
        console.log(secounds);
        setSell(true);
        sellCookies();
      }, secounds * 1000);
      window.setTimeout(() => {
        setSell(false);
      }, secounds * 1000);
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  });

  return (
    <div className="App">
      <GlobalStyle />
      <h1>BAKERY</h1>
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
          rawCookie < 1
            ? true
            : false || cookiesInOvenArray.length === 9
            ? true
            : false
        }
        onClick={() => {
          cookiesBakingStart();
        }}
      >
        Włóż ciastko do pieca
      </button>
      <DisplayAmount
        amount={cookiesInOvenArray.length}
        nameAmount={"ilosc ciastek w piekarniku"}
        type={"szt"}
      />
      <Oven
        cookiesInOvenArray={cookiesInOvenArray}
        setCookiesReadyToSell={setCookiesReadyToSell}
        cookiesReadyToSell={cookiesReadyToSell}
        setCookiesInOvenArray={setCookiesInOvenArray}
      ></Oven>
      <DisplayAmount
        amount={cookiesReadyToSell}
        nameAmount={"ilosc ciastek gotowych"}
        type={"szt"}
      />
      <DisplayAmount amount={ourMoney} nameAmount={"Nasz budżet"} type={"$"} />
    </div>
  );
}

export default App;

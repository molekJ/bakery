import { ProgressBar } from "./Components/ProgressBar";
import { useState, useEffect } from "react";
import { DisplayAmount } from "./Components/DisplayAmount";
import { DoughShelf } from "./Components/DoughShelf";
import { Oven } from "./Components/Oven";
import { GlobalStyle } from "./GlobalStyles";
import { Dough } from "./Components/Dought";
import { Cookie } from "./Components/Cookie";
import styled from "styled-components";
import { Popup } from "./Components/Popup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  background: var(--yellow-transparent);

  border-radius: 20px;
`;

const HeaderContainer = styled.div`
  height: 100px;

  display: flex;
  align-items: center;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
`;

const LeftContainer = styled.div`
  width: 240px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightContainer = styled.div`
width`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 140px);
  justify-content: center;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 40px);
`;
function App() {
  const [flourAmount, setFlourAmount] = useState<number>(400);
  const [progresDought, setProgresDought] = useState<number>(0);
  const [isMakingDought, setisMakingDought] = useState<boolean>(false);
  const [doughtArray, setDoughtArray] = useState<Dough[]>([]);
  const [rawCookie, setRawCookie] = useState<number>(0);
  const [cookiesInOvenArray, setCookiesInOvenArray] = useState<Cookie[]>([]);
  const [cookiesReadyToSell, setCookiesReadyToSell] = useState<number>(0);
  const [ourMoney, setOurMoney] = useState<number>(0);
  const [sell, setSell] = useState(false);
  const [freeSpaceInOven, setFreeSpaceInOven] = useState(9);
  const [popUp, setPopUp] = useState(false);

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
    if (flourAmount < 10 || doughtArray.length === 5) {
      setisMakingDought(false);
      return;
    }

    let timeoutId = 0;
    if (isMakingDought) {
      if (progresDought === 100) {
        setProgresDought(0);
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
    if (cookiesInOvenArray.length === 0) {
      setFreeSpaceInOven(9);
      return;
    }

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

    setFreeSpaceInOven(9 - cookiesInOvenArray.length);
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

  const refillOvenWithCookies = () => {
    // if (rawCookie <= freeSpaceInOven) {
    //   let b = rawCookie;
    //   for (let i = 0; i < b; i++) {
    //     cookiesBakingStart();
    //   }
    //   return;
    // }
    // if (rawCookie > freeSpaceInOven) {
    //   let c = freeSpaceInOven;
    //   for (let i = 0; i < c; i++) {
    //     cookiesBakingStart();
    //   }
    //   return;
    // }
  };

  return (
    <>
      <Popup popUp={popUp} setPopUp={setPopUp} />

      <Container style={{ opacity: popUp ? 1 : 0.2 }}>
        <GlobalStyle />
        <HeaderContainer>
          <h1>BAKERY</h1>
          <InfoContainer>
            <DisplayAmount
              amount={flourAmount}
              nameAmount={"Mąka"}
              type={"kg"}
            />
            <DisplayAmount
              amount={doughtArray.length}
              nameAmount={"Kule ciasta"}
              type={"szt"}
            />

            <DisplayAmount
              amount={rawCookie}
              nameAmount={"Surowe ciasteczka:"}
              type={"szt"}
            />
            <DisplayAmount
              amount={ourMoney}
              nameAmount={"Nasz budżet"}
              type={"$"}
            />
            <DisplayAmount
              amount={cookiesInOvenArray.length}
              nameAmount={"Ciastka w piekarniku"}
              type={"szt"}
            />
            <DisplayAmount
              amount={cookiesReadyToSell}
              nameAmount={"Ciastka na sprzedaż"}
              type={"szt"}
            />
            <DisplayAmount
              amount={freeSpaceInOven}
              nameAmount={"Wolne miejsce w piekarniku"}
              type={"szt"}
            />
          </InfoContainer>
        </HeaderContainer>

        <MainContainer>
          <LeftContainer>
            {" "}
            <button
              disabled={
                flourAmount < 10
                  ? true
                  : false || doughtArray.length === 5
                  ? true
                  : false
              }
              onClick={() => {
                setisMakingDought(!isMakingDought);
              }}
            >
              {isMakingDought ? "Zatrzymaj lepienie" : "Ulep ciasto"}
            </button>
            <ProgressBar progressValue={progresDought} />
            {doughtArray.map((element) => {
              return (
                <DoughShelf
                  key={element.id}
                  size={element.size}
                  onDoughClick={() => makeCookie(element.id)}
                />
              );
            })}{" "}
          </LeftContainer>
          <CenterContainer>
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
            <button
              disabled={
                rawCookie < 1
                  ? true
                  : false || cookiesInOvenArray.length === 9
                  ? true
                  : false
              }
              onClick={() => {
                refillOvenWithCookies();
              }}
            >
              Zapełnij piec
            </button>

            <Oven
              cookiesInOvenArray={cookiesInOvenArray}
              setCookiesReadyToSell={setCookiesReadyToSell}
              setCookiesInOvenArray={setCookiesInOvenArray}
            ></Oven>

            <button
              disabled={ourMoney < 100 ? true : false}
              onClick={() => {
                setFlourAmount((flourAmount) => flourAmount + 100);
                setOurMoney((ourMoney) => ourMoney - 100);
              }}
            >
              Kup mąkę
            </button>
          </CenterContainer>
          <RightContainer></RightContainer>
        </MainContainer>
      </Container>
    </>
  );
}

export default App;

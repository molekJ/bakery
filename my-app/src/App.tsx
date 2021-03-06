import { ProgressBar } from "./Components/ProgressBar";
import { useState, useEffect, useCallback } from "react";
import { DisplayAmount } from "./Components/DisplayAmount";
import { DoughShelf } from "./Components/DoughShelf";
import { Oven } from "./Components/Oven";
import { GlobalStyle } from "./GlobalStyles";
import { Dough } from "./Components/Dought";
import { Cookie } from "./Components/Cookie";
import styled from "styled-components";
import { StartPopup } from "./Components/StartPopup";
import { EndPopUp } from "./Components/EndPopUp";

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
  @media screen and (max-width: 576px) {
    height: 100%;
    h1 {
      font-size: 20px;
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 40px);

  @media screen and (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

const LeftContainer = styled.div`
  width: 240px;

  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 180px;
  }

  @media screen and (max-width: 576px) {
    width: 100px;
    margin-right: 10px;
  }
`;

const CenterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 400px;
    height: 400px;
  }

  @media screen and (max-width: 576px) {
    width: 200px;
    height: 200px;
  }
`;

const RightContainer = styled.div`
  width: 240px;
  margin-right: 10px;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  height: calc(100vh - 140px);
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex-direction: row;
    height: 100%;
    flex-wrap: wrap;
  }
`;

function App() {
  const [flourAmount, setFlourAmount] = useState<number>(100);
  const [progresDought, setProgresDought] = useState<number>(0);
  const [isMakingDought, setisMakingDought] = useState<boolean>(false);
  const [doughtArray, setDoughtArray] = useState<Dough[]>([]);
  const [rawCookie, setRawCookie] = useState<number>(0);
  const [cookiesInOvenArray, setCookiesInOvenArray] = useState<Cookie[]>([]);
  const [cookiesReadyToSell, setCookiesReadyToSell] = useState<number>(0);
  const [ourMoney, setOurMoney] = useState<number>(0);
  const [sell, setSell] = useState<boolean>(false);
  const [freeSpaceInOven, setFreeSpaceInOven] = useState<number>(9);
  const [startPopUp, setStartPopUp] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [secounds, setSecounds] = useState<number>(0);
  const [isActiveTimer, setIsActiveTimer] = useState<boolean>(false);
  const [endPopUp, setEndPopUp] = useState<boolean>(false);
  const [timerInOven, setTimerInOven] = useState<number>(0);

  const ClearAll = () => {
    setFlourAmount(100);
    setProgresDought(0);
    setisMakingDought(false);
    setDoughtArray([]);
    setRawCookie(0);
    setCookiesInOvenArray([]);
    setCookiesReadyToSell(0);
    setOurMoney(0);
    setSell(false);
    setFreeSpaceInOven(9);
  };

  const clearScoreAndSecounds = () => {
    setSecounds(0);
    setScore(0);
    setIsActiveTimer(!isActiveTimer);
  };

  const sendToLocalStorage = () => {
    if (localStorage.getItem("score") === null) {
      localStorage.setItem("score", JSON.stringify(score));
    } else {
      const bestValue = localStorage.getItem("score");

      if (bestValue) {
        if (score > JSON.parse(bestValue)) {
          localStorage.setItem("score", JSON.stringify(score));
        }
      }
    }
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (!isActiveTimer) {
        return;
      }
      setSecounds((secounds) => secounds + 1);
    }, 1000);
    return () => clearInterval(myInterval);
  }, [secounds, isActiveTimer]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (!isActiveTimer) {
        return;
      }
      setTimerInOven((timerInOven) => timerInOven + 1);
    }, 200);
    return () => clearInterval(myInterval);
  }, [timerInOven, isActiveTimer]);

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
        setScore((score) => score + 1);

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
  }, [progresDought, isMakingDought, doughtArray, flourAmount]);

  const makeCookie = (doughId: number) => {
    setScore((score) => score + 1);

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
    setScore((score) => score + 1);

    setCookiesInOvenArray((cookiesInOvenArray) => [
      ...cookiesInOvenArray,
      { id: Date.now(), color: "yellow", place: "oven" },
    ]);
  };

  useEffect(() => {
    const date = Date.now();
    if (cookiesInOvenArray.length === 0) {
      setFreeSpaceInOven(9);
      return;
    }
    setCookiesInOvenArray((old) =>
      old
        .map((cookie): Cookie => {
          if (date - cookie.id >= 3000 && date - cookie.id < 6000) {
            return { ...cookie, color: "orange" };
          }

          if (date - cookie.id >= 6000 && date - cookie.id < 9000) {
            return { ...cookie, color: "brown" };
          }

          if (date - cookie.id >= 9000 && date - cookie.id < 12000) {
            return { ...cookie, color: "black" };
          }

          return cookie;
        })
        .filter((cookie) => date - cookie.id < 12000)
    );

    setFreeSpaceInOven(9 - cookiesInOvenArray.length);
  }, [timerInOven, cookiesInOvenArray.length]);

  const randomAmount = () => {
    let number = Math.floor(Math.random() * 10 + 1);
    return number;
  };

  const sellCookies = useCallback(() => {
    let amount = randomAmount();
    if (cookiesReadyToSell === 0) {
      return;
    }
    if (amount >= cookiesReadyToSell) {
      amount = cookiesReadyToSell;
      setCookiesReadyToSell(0);
      if (amount > 5) {
        setOurMoney((ourMoney) => ourMoney + amount * 4);
        setScore((score) => score + amount * 4);
      } else {
        setOurMoney((ourMoney) => ourMoney + amount * 5);
        setScore((score) => score + amount * 5);
      }
      return;
    } else {
      setCookiesReadyToSell(cookiesReadyToSell - amount);
      if (amount > 5) {
        setOurMoney((ourMoney) => ourMoney + amount * 4);
        setScore((score) => score + amount * 4);
      } else {
        setOurMoney((ourMoney) => ourMoney + amount * 5);
        setScore((score) => score + amount * 5);
      }
      return;
    }
  }, [sell]);

  const randomSecound = () => {
    let number = Math.floor(Math.random() * 4 + 3);
    return number;
  };

  useEffect(() => {
    if (startPopUp === true) {
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
  }, [sell, startPopUp, sellCookies]);

  return (
    <>
      <StartPopup
        startPopUp={startPopUp}
        setStartPopUp={setStartPopUp}
        setIsActiveTimer={setIsActiveTimer}
      />

      <EndPopUp
        endPopUp={endPopUp}
        setEndPopUp={setEndPopUp}
        secounds={secounds}
        score={score}
        clearScoreAndSecounds={clearScoreAndSecounds}
      />

      <Container style={{ display: startPopUp || endPopUp ? "none" : "block" }}>
        <GlobalStyle />
        <HeaderContainer>
          <h1>BAKERY</h1>
          <InfoContainer>
            <DisplayAmount
              amount={flourAmount}
              nameAmount={"M??ka"}
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
              nameAmount={"Nasz bud??et"}
              type={"$"}
            />
            <DisplayAmount
              amount={cookiesInOvenArray.length}
              nameAmount={"Ciastka w piekarniku"}
              type={"szt"}
            />
            <DisplayAmount
              amount={cookiesReadyToSell}
              nameAmount={"Ciastka na sprzeda??"}
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
              W?????? ciastko do pieca
            </button>

            <Oven
              cookiesInOvenArray={cookiesInOvenArray}
              setCookiesReadyToSell={setCookiesReadyToSell}
              setCookiesInOvenArray={setCookiesInOvenArray}
              setScore={setScore}
            ></Oven>

            <button
              disabled={ourMoney < 100 ? true : false}
              onClick={() => {
                setFlourAmount((flourAmount) => flourAmount + 100);
                setOurMoney((ourMoney) => ourMoney - 100);
                setScore((score) => score + 10);
              }}
            >
              Kup m??k??
            </button>
          </CenterContainer>
          <RightContainer>
            <DisplayAmount
              amount={score}
              nameAmount={"Tw??j wynik"}
              type={"pkt"}
            />
            <DisplayAmount
              amount={secounds}
              nameAmount={"Czas gry"}
              type={"s"}
            />
            <button
              onClick={() => {
                setEndPopUp((endPopUp) => !endPopUp);
                setIsActiveTimer(!isActiveTimer);
                ClearAll();
                sendToLocalStorage();
              }}
            >
              Zakoncz
            </button>
          </RightContainer>
        </MainContainer>
      </Container>
    </>
  );
}

export default App;

import { ProgressBar } from "./Components/ProgressBar";
import { useState, useEffect } from "react";
import { DisplayAmount } from "./Components/DisplayAmount";
import { DoughShelf } from "./Components/DoughShelf";

function App() {
  const [flourAmount, setFlourAmount] = useState<number>(40);
  const [progresDought, setProgresDought] = useState<number>(0);
  const [isMakingDought, setisMakingDought] = useState<boolean>(false);
  const [doughtAmount, setDoughtAmount] = useState<number>(0);
  const [doughtArray, setDoughtArray] = useState<number[]>([]);

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

      {doughtArray.map((e) => {
        return <DoughShelf />;
      })}
    </div>
  );
}

export default App;

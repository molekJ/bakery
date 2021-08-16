import {ProgressBar} from './Components/ProgressBar'
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { DisplayAmount } from './Components/DisplayAmount';
function App() {


  const [flourAmount, setFlourAmount] = useState<number>(100);
  const [progresDought, setProgresDought] = useState<number>(0);
  const [isMakingDought, setisMakingDought] = useState<boolean>(false);
  const [doughtAmount, setDoughtAmount] = useState<number>(0);


  useEffect(() => {
    if(flourAmount < 10){
      setisMakingDought(false);
      return;
    }
    if(isMakingDought){
       if(progresDought === 100){
       setProgresDought(0);
       setDoughtAmount(doughtAmount + 1);
       setFlourAmount(flourAmount - 10);
       return;
      }
      setTimeout(()=>{
        return setProgresDought(progresDought + 1)
      },40)
    }}, [progresDought, isMakingDought])
      
      return (
        <div className="App">
           <h1>BACERY</h1>
           <ProgressBar progressValue={progresDought}/>
           <DisplayAmount amount={flourAmount} nameAmount={"Ilość dostępnej mąki:"}/>
      <button disabled={flourAmount<10? true : false} onClick={() => {
        setisMakingDought(!isMakingDought)
      }}>{isMakingDought ?'Zatrzymaj lepienie' : 'Ulep ciasto'}</button>
      <DisplayAmount amount={doughtAmount} nameAmount={"liczba ulepionych kul"}/>
    </div>
  );
}


export default App;

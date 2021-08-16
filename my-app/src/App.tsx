import {ProgressBar} from './Components/ProgressBar'
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { DisplayAmount } from './Components/DisplayAmount';
function App() {


  const [progresDought, setProgresDought] = useState<number>(0);
  const [isMakingDought, setisMakingDought] = useState<boolean>(false);
  const [doughtAmount, setDoughtAmount] = useState<number>(0);


  useEffect(() => {
    if(isMakingDought){

      if(progresDought === 100){
       setProgresDought(0);
       setDoughtAmount(doughtAmount + 1);
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
      <button onClick={() => {
        setisMakingDought(!isMakingDought)
      }}>{isMakingDought ?'Zatrzymaj lepienie' : 'Ulep ciasto'}</button>
      <DisplayAmount amount={doughtAmount} nameAmount={"liczba ulepionych kul"}/>
    </div>
  );
}


export default App;

import { nanoid } from "nanoid";
import React,{useState,useEffect}from "react"
import Die from "./components/Die"
import Confetti from "react-confetti"
function App() {

const[dice,setDice]=useState(
    allNewDice())
const[ tenzies,setTenzies]=useState(false)
//Game timer
const[timeLeft,setTimeLeft]=useState(60)
useEffect(()=>{
  const timer =setInterval(()=>{
    setTimeLeft(prevTime=>prevTime-1)
  },1000)
  return ()=>clearInterval(timer)
},[])
useEffect(() => {
  if (timeLeft <= 0) {
    setDice(allNewDice());
    setTenzies(false);
    setRolls(0)
    setTimeLeft(60);
  }
}, [timeLeft]);


useEffect(()=>{
  const allHeld=dice.every(die=>die.isHeld)
  const allSame=dice.every(die=>die.value===dice[0].value)
  if(allHeld&&allSame){
    setTenzies(true)
    setRolls(0)
  }
},[dice])
function allNewDice() {
  const newDice = [];
  for (let i = 0; i < 10; i++) {
    newDice.push({
      value: Math.floor(Math.random() * 6 + 1),
      isHeld:false,
      id:nanoid()
    });
  }
  return newDice;
}
const diceElements=dice.map(die=>
<Die 
key={die.id} 
value={die.value} 
isHeld={die.isHeld} 
holdDie={()=>holdDie(die.id)}
/>)
// keep track of rolls
const[rolls,setRolls]=useState(0)

function handleClick() {
  if (!tenzies) {
    setDice(prevDice => {
      return prevDice.map(die => {
        if (die.isHeld) {
          return die;
        }
        return {
          ...die,
          value: Math.floor(Math.random() * 6 + 1)
        };
      });
    });
    setRolls(prevRolls => prevRolls + 1);  // increment the rolls by 1
  } else {
    setDice(allNewDice());
    setTenzies(false);
    setRolls(0);  // reset the rolls to 0 when starting a new game
  }
}
function holdDie(id){
 setDice(prevDice=>{
    return prevDice.map(die=>{
      if(die.id===id){
        return {
          ...die,
          isHeld:!die.isHeld}
      }
      return die
    })
 })
}
  return (
    <main>  
      {tenzies&&<Confetti/>}     
                <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceElements} 
      </div>
      <button  className="roll-dice" onClick={handleClick}>{tenzies?"New Game":"Roll"}</button>
      <div className="Rolls">
      <p>Number of Rolls: {rolls}</p>
      <p>{timeLeft <= 0 ? "Time's Up" : `Time Left: ${timeLeft} seconds`}</p>
      </div>



        </main>
  )
}


export default App

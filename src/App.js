import React,{useRef} from "react"
import Die from "./Die"
import Confetti from 'react-confetti'
import { nanoid } from "nanoid"
import SuccessPop from "./SuccessPop"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [numberRoll, setNumberRoll] = React.useState(0)
    const [diceNumber, setDiceNumber] = React.useState(0)
    const [numberParty,setNumberParty]=React.useState(0)
    const [bestTime,setBestTime] = React.useState(0)
    let totalSec  = useRef(0);
    let star = useRef(null);

   
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true);
            setNumberParty(prevNumberParty=>++prevNumberParty)
            getBestValue(totalSec.current)
           
        }
        
    }, [dice])
    

    React.useEffect(() => {
           startGame()
      },[])
   
    
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
            setNumberRoll(prevNumberRoll => ++prevNumberRoll)
        } else {
            setTenzies(false)
            setDice(allNewDice()) 
        }
    }
    
    function startGame(){
        star.current = setInterval(startCount,1000);
        localStorage.clear()
    }


    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die

        }))

        dice.map(die => {
            return die.id === id ? setDiceNumber(die.value) : {}
        }
        )
    }

    function setTenzi() {
        const value=0;
        setTenzies(false)
        setDice(allNewDice())
        setNumberRoll(0)
        totalSec.current=value;
      
    }

    function getBestValue(value){
        const prevValue = localStorage.getItem('bestvalue')
        console.log(prevValue)
        if(prevValue && value<prevValue){
        localStorage.clear();
        localStorage.setItem('bestvalue',value)
        setBestTime(value)
        }else if(!prevValue){
            localStorage.setItem('bestvalue',value)
            setBestTime(value)
        }else if(prevValue && value>prevValue){
              
        }
    }

    function startCount(){
        ++totalSec.current
        switch(tenzies){
            case true :
                setInterval(star.current) ;
                break
            default:
               console.log(` `); 
        }
     
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
            
        />
    ))



    return (

        <React.Fragment>
            
                {tenzies &&
                    <Confetti />
                }
                
                {
                    tenzies ?<main> <SuccessPop
                        closeModal={setTenzi}
                        numberRoll={numberRoll}
                        diceNumber={diceNumber}
                        totalSec={totalSec.current}
                        numberParty={numberParty}
                        bestValue ={bestTime}
                    /> 
                </main> 
                    :
                        <main>
                            <h1 className="title">Tenzies</h1>
                            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                            <div className="dice-container">
                                {diceElements}
                            </div>
                            <button className="roll-dice" onClick={rollDice}>
                                Roll
                            </button>
                            </main>

                }
            
        </React.Fragment>

    )
}
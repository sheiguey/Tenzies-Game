import React from "react";
import './modal.css';
import './style.css';

const SuccessPop =(props)=>{

const choosenDice = `/dices/dice-${props.diceNumber}.png`
const sec = props.totalSec 
const min =parseInt(sec/60)

const bestSec = props.bestValue
const bestMin = parseInt(bestSec/60)

  return (
      
    <div className="modal">
      <div className="youwin">
        <h1 className="neon">You</h1>
        <h1 className="flux">win</h1>
      </div>

      <ul className="recap">
        <li><p>Choosen Dice : <img alt="choosen dice" src={choosenDice} className="choosen-dice" /></p></li>
        <li><p>number of roll : {props.numberRoll}</p></li>
        <li><p>number of rounds : {props.numberParty}</p></li>
            <li>
              <p>Time : {min} min : {sec<60?sec:sec%60} sec
              </p>
              
              </li>
        
        <li><p>best time : {bestMin} min : {bestSec<60?bestSec:bestSec%60} sec</p></li>
      </ul>
      
      

      <button className="new-game" onClick={props.closeModal}>
        New Game
      </button>
    </div>
      
  

) 
}

export default SuccessPop
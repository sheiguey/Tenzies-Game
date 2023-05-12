import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
   const image = `/dices/dice-${props.value}.png`
   const alt = `image dice ${props.value}`
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
            
        >
            
            <img alt={alt}  src={image}/> 
        </div>
    )
}
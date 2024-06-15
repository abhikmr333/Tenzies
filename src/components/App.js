import React, { useState } from "react";
import Die from "./Die.js";

export default function App() {
    //creating array of objects which describe the 10 dies
    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            const randomNum = Math.floor(Math.random() * 6) + 1;
            newDice.push({ value: randomNum, isHeld: false });
        }
        return newDice;
    }
    //set array of 10 random dice numbers as lazy state initialization
    const [dice, setDice] = useState(() => allNewDice());

    //map over the state variable dice to create 10 Die components
    const dieElements = dice.map((die, index) => {
        return <Die key={index} value={die.value} />;
    });

    //update the state with new random values of dice when roll is clicked
    function rollDice() {
        //only roll those dice which are not held
        setDice((prevValue) => {
            return prevValue.map((die) => {
                //held then simply no change else change value property to random dice number
                if (die.isHeld) {
                    return { ...die };
                } else {
                    const randomNum = Math.floor(Math.random() * 6) + 1;
                    return { ...die, value: randomNum };
                }
            });
        });
    }

    return (
        <main className="game">
            <section className="game--die-container">
                {/*displaying the list of 10 die components*/}
                {dieElements}
            </section>
            <button onClick={rollDice} className="game--roll-btn">
                Roll
            </button>
        </main>
    );
}

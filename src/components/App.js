import React, { useState } from "react";
import Die from "./Die.js";
//using nanoid to generate random ids to use as key prop
import { nanoid } from "nanoid";

export default function App() {
    //creating array of objects which describe the 10 dies
    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            const randomNum = Math.floor(Math.random() * 6) + 1;
            //using nanoid to generate ids which will be later used as key props of die component
            newDice.push({ value: randomNum, isHeld: false, id: nanoid() });
        }
        return newDice;
    }
    //set array of 10 random dice numbers as lazy state initialization
    const [dice, setDice] = useState(() => allNewDice());

    function holdDie(dieId) {
        //toggling the isHeld property
        setDice((prevDice) => {
            return prevDice.map((prevDie) => {
                return dieId === prevDie.id
                    ? { ...prevDie, isHeld: !prevDie.isHeld }
                    : { ...prevDie };
            });
        });
    }

    //map over the state variable dice to create 10 Die components
    const dieElements = dice.map((die) => {
        return (
            <Die
                isHeld={die.isHeld}
                key={die.id}
                value={die.value}
                //the id of each comoponent is remembered due to closures
                holdDie={() => holdDie(die.id, die.isHeld)}
            />
        );
    });

    //update the state with new random values of dice when roll is clicked
    function rollDice() {
        //updating state value and only roll those dice which are not held
        setDice((prevDice) => {
            return prevDice.map((die) => {
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
            <h1 className="game--title">Tenzies</h1>
            <p className="game--instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
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

import React, { useState } from "react";
import Die from "./Die.js";

export default function App() {
    //creating 10 random die components with random values
    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(Math.floor(Math.random() * 6) + 1);
        }
        return newDice;
    }
    //set array of 10 random dice numbers as lazy state initialization
    const [dice, setDice] = useState(() => allNewDice());

    //map over the state variable dice to create 10 Die components
    const dieElements = dice.map((dieVal, index) => {
        return <Die key={index} value={dieVal} />;
    });

    return (
        <main className="game">
            <section className="game--die-container">
                {/*displaying the list of 10 die components*/}
                {dieElements}
            </section>
            <button className="game--roll-btn">Roll</button>
        </main>
    );
}

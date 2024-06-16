import React from "react";

export default function Die(props) {
    return (
        //if the die is held apply green bg to it
        <div
            onClick={props.holdDie}
            className={props.isHeld ? "die held" : "die"}
        >
            <h3>{props.value}</h3>
        </div>
    );
}

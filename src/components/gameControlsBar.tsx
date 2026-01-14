import React, { ReactElement, useState } from 'react';
import "../game.css";


type GameControlsBarProps = {
    shuffle: () => void,
    submit: () => void,
    deselect: () => void,
    inactiveList: String[]
};

function GameControlsBar(props: GameControlsBarProps): ReactElement {
    const handleClick = (buttonName: string): void => {
        if (!props.inactiveList.includes(buttonName)) {
            if (buttonName === "submit") {
                props.submit();
            }
            if (buttonName === "shuffle") {
                props.shuffle();
            }
            if (buttonName === "deselect") {
                props.deselect();
            }
        }
    };
    
    let submitClassList = "game-control-button";
    let shuffleClassList = "game-control-button";
    let deselectClassList = "game-control-button";
    if (props.inactiveList.includes("submit")) {
        submitClassList += " button-inactive";
    }
    if (props.inactiveList.includes("shuffle")) {
        shuffleClassList += " button-inactive";
    }
    if (props.inactiveList.includes("deselect")) {
        deselectClassList += " button-inactive";
    }
    return (
        <div className="game-controls-bar">
            <div />
            <div className={deselectClassList} onClick={() => handleClick("deselect")}>
                Deselect
            </div>
            <div className={shuffleClassList} onClick={() => handleClick("shuffle")}>
                Shuffle
            </div>
            <div className={submitClassList} onClick={() => handleClick("submit")}>
                Submit
            </div>
            <div />
        </div>
    )
}

export default GameControlsBar;
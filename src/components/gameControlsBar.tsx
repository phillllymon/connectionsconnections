import React, { ReactElement, useState } from 'react';
import "../game.css";


type GameControlsBarProps = {
    shuffle: () => void,
    submit: () => void
};

function GameControlsBar(props: GameControlsBarProps): ReactElement {
    return (
        <div className="game-controls-bar">
            <div />
            <div className="game-control-button" onClick={props.submit}>
                Submit
            </div>
            <div className="game-control-button" onClick={props.shuffle}>
                Shuffle
            </div>
            <div />
        </div>
    )
}

export default GameControlsBar;
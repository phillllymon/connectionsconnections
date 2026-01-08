import React, { ReactElement, useState } from 'react';
import "../game.css";


type GuessesBarProps = {
    guessesLeft: number
};

function GuessesBar(props: GuessesBarProps): ReactElement {
    return (
        <div className="guesses-bar">
            <div>
                Guesses remaining:
            </div>
            {[0, 1, 2, 3].map((i) => {
                if (i < props.guessesLeft) {
                    return <div className="guess" key={i} />;
                } else {
                    return <div className="guess ghost-guess" key={i} />
                }
            })}
        </div>
    )
}

export default GuessesBar;
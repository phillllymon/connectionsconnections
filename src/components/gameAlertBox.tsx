import React, { ReactElement, useState } from 'react';
import "../game.css";

type GameAlertBoxProps = {
    messagesObj: Record<any, string>
};

function GameAlertBox(props: GameAlertBoxProps): ReactElement {

    return (
        <div className="game-alert-box">
            {Object.keys(props.messagesObj).map((messageId, i) => {
                const message = props.messagesObj[messageId];
                return (
                    <div className="game-alert" key={i}>
                        {message}
                    </div>
                );
            })}
        </div>
    );
}

export default GameAlertBox;
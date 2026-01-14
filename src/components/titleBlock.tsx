import React, { ReactElement } from 'react';
import "../game.css";


type TitleBarProps = {
    title: string,
    author: string,
    winRate?: number
};

function TitleBar(props: TitleBarProps): ReactElement {
    return (
        <div className="title-block">
            <div>
                {props.title}
            </div>
            {props.winRate ? (
                <div className="finished-row-labels">
                    puzzle win rate: {props.winRate}%
                </div>
            ) : (
                <div className="finished-row-labels">
                    by {props.author}
                </div>
            )}
        </div>
    )
}

export default TitleBar;
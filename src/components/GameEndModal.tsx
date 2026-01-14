import React, { ReactElement, useState } from 'react';
import StarRater from "./starRater";
import TitleBlock from "./titleBlock";
import { toPercent } from "../util";
import { ratePuzzle } from "../api/query";
import "../game.css";


type GameEndModalProps = {
    closeModal: () => void,
    startNewGame: () => void,
    switchToCreateMode: () => void,
    result: "win" | "lose",
    info: {
        id: number,
        title: string,
        author: string,
        wins: number,
        losses: number,
        rating: number
    }
};

function GameEndModal(props: GameEndModalProps): ReactElement {
    const [starRating, setStarRating] = useState(0);

    const handleNewGame = (): void => {
        ratePuzzle(props.info.id, starRating);
        window.location.replace(`${window.location.href.split("?")[0]}`);
    };
    const handleAdmirePuzzle = (): void => {
        ratePuzzle(props.info.id, starRating);
        props.closeModal();
    };
    const handleCreatePuzzle = (): void => {
        ratePuzzle(props.info.id, starRating);
        props.closeModal();
        props.switchToCreateMode();
    };

    let winRate = 100;
    if (props.info.wins + props.info.losses > 0) {
        winRate = toPercent(props.info.wins / (props.info.wins + props.info.losses));
    }
    
    return (
        <>
            <div className="model-curtain"></div>
            <div className="model">
                <TitleBlock title={props.info.title} author={props.info.author} winRate={winRate} />
                <br />
                {props.result === "win" ? "NICE WORK!" : "GAME OVER"}
                <br />
                <br />
                <br />
                Rate this puzzle to play again
                <br />
                <StarRater reportRating={(n: number) => setStarRating(n)}/>
                <br />
                <br />
                {starRating > 0 && (
                    <div className="modal-buttons-bar">
                        <div className="game-control-button model-button" onClick={handleCreatePuzzle}>
                            Create puzzle
                        </div>
                        <div className="game-control-button model-button" onClick={handleNewGame}>
                            Play again
                        </div>
                        <div className="game-control-button model-button" onClick={handleAdmirePuzzle}>
                            Admire puzzle
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default GameEndModal;
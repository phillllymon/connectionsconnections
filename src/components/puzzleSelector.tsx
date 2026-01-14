import React, { ReactElement, useState, useEffect, useRef } from 'react';
import GameContainer from "./gameContainer";
import { createGameStateFromRawPuzzle } from "../util";
import type { GameState } from "../types";

import { getRandomPuzzle, getPuzzleById } from "../api/query";


function PuzzleSelector(): ReactElement {
    const [gameState, setGameState] = useState<false | GameState>(false);
        
    const didRun = useRef(false);
    
    const getNewPuzzle = (): void => {
        setGameState(false);
        let puzzleIdToFetch: false | number = false;
        const url = window.location.href;
        const variableSection = url.split("?")[1];
        if (variableSection) {
            const variables = variableSection.split("&");
            variables.forEach((variable) => {
                const pieces = variable.split("=");
                if (pieces[0] === "id" && pieces[1]) {
                    puzzleIdToFetch = Number.parseInt(pieces[1]);
                }
            });
        }
        if (puzzleIdToFetch) {
            getPuzzleById(puzzleIdToFetch).then((res) => {
                const newGameState = createGameStateFromRawPuzzle(res);
                setTimeout(() => {
                    setGameState(newGameState);
                }, 200);
            });
        } else {
            getRandomPuzzle().then((res) => {
                const newGameState = createGameStateFromRawPuzzle(res);
                setTimeout(() => {
                    setGameState(newGameState);
                }, 200);
            });
        }
    }

    useEffect(() => {
        if (didRun.current) {
            return;
        } else {
            didRun.current = true;
            getNewPuzzle();
        }
    }, []);

    if (!gameState) {
        return (
            <div>
                loading...
            </div>
        );
    } else {
        return (
            <GameContainer
                gameState={gameState}
                getNewPuzzle={getNewPuzzle}
            />
        );
    }
}

export default PuzzleSelector;
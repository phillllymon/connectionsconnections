import React, { ReactElement, useState, useEffect } from 'react';
import "../game.css";
import Grid from "./grid";
import GuessesBar from "./guessesBar";
import GameControlsBar from "./gameControlsBar";
import { shuffleInPlace } from "../util";
import type { GameState, Item } from "../types";

const sampleGameState: GameState = {
    groups: [
        {
            color: "green",
            category: "colors",
            items: [
                { id: 0, label: "orange", selected: false },
                { id: 1, label: "blue", selected: false },
                { id: 2, label: "green", selected: false },
                { id: 3, label: "red", selected: false }
            ],
            finished: false
        },
        {
            color: "yellow",
            category: "bond movies",
            items: [
                { id: 4, label: "Goldfinger", selected: false },
                { id: 5, label: "Skyfall", selected: false },
                { id: 6, label: "Casino Royale", selected: false },
                { id: 7, label: "Octopussy", selected: false }
            ],
            finished: true
        },
        {
            color: "purple",
            category: "ships",
            items: [
                { id: 8, label: "Enterprise", selected: false },
                { id: 9, label: "Constitution", selected: false },
                { id: 10, label: "Queen Mary", selected: false },
                { id: 11, label: "Eclipse", selected: false }
            ],
            finished: true
        },
        {
            color: "blue",
            category: "First words in book titles",
            items: [
                { id: 12, label: "Anna", selected: false },
                { id: 13, label: "Crime", selected: false },
                { id: 14, label: "Winnie", selected: false },
                { id: 15, label: "Great", selected: false }
            ],
            finished: false
        }
    ],
    looseItemsByRow: [],
    guessed: [],
    remainingGuesses: 4
};

function GameContainer(): ReactElement {
    const gameState = sampleGameState;

    const [pokeNum, setPokeNum] = useState(0);
    const [remainingGuesses, setRemainingGuesses] = useState(gameState.remainingGuesses);

    const shuffleAndPopulateLooseItems = (): void => {
        const looseItems: Item[] = [];
        gameState.groups.forEach((group) => {
            if (!group.finished) {
                looseItems.push(...group.items);
            }
        });
        shuffleInPlace(looseItems);
        const looseItemsByRow: Item[][] = [];
        for (let i = 0; i < looseItems.length; i += 4) {
            looseItemsByRow.push(looseItems.slice(i, i + 4));
        };
        gameState.looseItemsByRow = looseItemsByRow;
        setPokeNum(Math.random());
    };

    useEffect(shuffleAndPopulateLooseItems, []);
    
    const submit = () => {
        let winnerFound = false;
        const selectedItemIds: number[] = [];
        gameState.groups.forEach((group) => {
            let groupSelected = true;
            group.items.forEach((item) => {
                if (!item.selected) {
                    groupSelected = false;
                } else {
                    selectedItemIds.push(item.id);
                }
            });
            if (groupSelected) {
                group.items.forEach((item) => {
                    item.selected = false;
                });
                group.finished = true;
                winnerFound = true;
                shuffleAndPopulateLooseItems();
            }
        });
        if (!winnerFound) {
            const selectedIdCode = selectedItemIds.sort((a, b) => {
                if (a > b) {
                    return 1;
                } else {
                    return -1;
                }
            }).join("-");
            if (gameState.guessed.includes(selectedIdCode)) {
                console.log("ALREADY GUESSED!");
            } else {
                // WIGGLE WIGGLE WIGGLE
                const selectedSquares = document.getElementsByClassName("square-selected");
                for (let i = 0; i < selectedSquares.length; i++) {
                    (selectedSquares[i] as HTMLElement).classList.add("square-wiggle");
                }
                setTimeout(() => {
                    for (let i = 0; i < selectedSquares.length; i++) {
                        selectedSquares[i].classList.remove("square-wiggle");
                    }
                }, 1000);
                // WIGGLE WIGGLE WIGGLE
                gameState.guessed.push(selectedIdCode);
                gameState.remainingGuesses -= 1;
                setRemainingGuesses(gameState.remainingGuesses);
            }
        }
    };
    const shuffle = () => {
        shuffleAndPopulateLooseItems();
    };

    return (
        <div className="game-container">
            <div>
                <br />
                Create groups of four!
                <br />
                <br />

            </div>
            <Grid gameState={gameState} pokeNum={pokeNum} />
            <GuessesBar guessesLeft={remainingGuesses} />
            <GameControlsBar submit={submit} shuffle={shuffle} />
        </div>
    );
}

export default GameContainer;
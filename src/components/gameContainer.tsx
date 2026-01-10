import React, { ReactElement, useState, useEffect } from 'react';
import "../game.css";
import Grid from "./grid";
import GuessesBar from "./guessesBar";
import GameControlsBar from "./gameControlsBar";
import GameAlertBox from "./gameAlertBox";
import { shuffleInPlace, arrDeleteVal } from "../util";
import { gameStates } from "../sampleGameStates";
import type { GameState, Item, Group } from "../types";

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
            finished: false
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
            finished: false
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

function getNum(rangeSize: number): number {
    return Math.floor(rangeSize * Math.random());
}

function GameContainer(): ReactElement {
    // const gameState: GameState = gameStates[Math.floor(gameStates.length * Math.random())];
    // let gameState: GameState;
    // const gameState: GameState = gameStates[getNum(gameStates.length)];
    // useEffect(() => {
    //     gameState = gameStates[getNum(gameStates.length)];
    // }, []);

    const [gameState, setGameState] = useState<GameState>(gameStates[getNum(gameStates.length)]);

    const [pokeNum, setPokeNum] = useState(0);
    const [remainingGuesses, setRemainingGuesses] = useState(gameState.remainingGuesses);
    const [inactiveButtons, setInactiveButtons] = useState<string[]>(["submit"]);
    const [messagesObj, setMessagesObj] = useState<Record<any, string>>({});
    const [gameOver, setGameOver] = useState(false);

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

    const deactivateButton = (buttonName: string): void => {
        const newInactiveButtons = inactiveButtons.map(ele => ele);
        newInactiveButtons.push(buttonName);
        setInactiveButtons(newInactiveButtons);
    };
    const activateButton = (buttonName: string): void => {
        const newInactiveButtons = arrDeleteVal(inactiveButtons, buttonName);
        setInactiveButtons(newInactiveButtons);
    };

    const finishGroup = (group: Group): void => {
        group.items.forEach((item) => {
            item.selected = false;
        });
        group.finished = true;
        // order finished groups correctly
        const newGroups: Group[] = [];
        const unfinishedGroups: Group[] = [];
        gameState.groups.forEach((g) => {
            if (g.color !== group.color && g.finished) {
                newGroups.push(g);
            } else if (!g.finished) {
                unfinishedGroups.push(g);
            }
        });
        newGroups.push(group);
        newGroups.push(...unfinishedGroups);
        gameState.groups = newGroups;
        // ANIMATE SWITCHEROO!!!!
        const winningIds: number[] = [];
        group.items.forEach((item) => {
            winningIds.push(item.id);
        });
        const needToMoveDownIds: number[] = [];
        const needToMoveUpIds: number[] = [];
        gameState.looseItemsByRow.forEach((row, i) => {
            row.forEach((item) => {
                if (i === 0) {
                    if (!winningIds.includes(item.id)) {
                        needToMoveDownIds.push(item.id);
                    }
                } else {
                    if (winningIds.includes(item.id)) {
                        needToMoveUpIds.push(item.id);
                    }
                }
            });
        });
        const switchPairIds: number[][] = [];
        for (let i = 0; i < needToMoveDownIds.length; i++) {
            switchPairIds.push([needToMoveDownIds[i], needToMoveUpIds[i]]);
        }
        switchElementsByIdPairs(switchPairIds).then(() => {
            shuffleAndPopulateLooseItems();
        });
        // END ANIMATE SWITCHEROO!!!!
    };

    const endGame = (): void => {
        const groupsToFinish: Group[] = [];
        gameState.groups.forEach((group) => {
            if (!group.finished) {
                groupsToFinish.push(group);
            }
        });
        finishGroupsRecursive(groupsToFinish, 0).then(() => {
            setGameOver(true);
        });
    };

    const finishGroupsRecursive = (groups: Group[], i: number): Promise<void> => {
        return new Promise((resolve) => {
            const groupToFinish = groups[i];
            if (groupToFinish) {
                finishGroup(groupToFinish);
                setTimeout(() => {
                    finishGroupsRecursive(groups, i + 1).then(() => {
                        resolve();
                    });
                }, 2000);
            } else {
                resolve();
            }
        });
    };

    const submit = () => {
        const newMessages: string[] = [];
        deactivateButton("submit");
        setTimeout(() => {
            let winnerFound = false;
            const selectedItemIds: number[] = [];
            gameState.groups.forEach((group) => {
                let groupSelected = true;
                let numInThisGroupSelected = 0;
                group.items.forEach((item) => {
                    if (!item.selected) {
                        groupSelected = false;
                    } else {
                        numInThisGroupSelected += 1;
                        selectedItemIds.push(item.id);
                    }
                });
                if (numInThisGroupSelected === 3) {
                    newMessages.push("ONE AWAY!");
                }
                if (groupSelected) {
                    finishGroup(group);
                    winnerFound = true;
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
                    activateButton("submit");
                    newMessages.push("ALREADY GUESSED!");
                } else {
                    setTimeout(() => {
                        const selectedSquares = document.getElementsByClassName("square-selected");
                        for (let i = 0; i < selectedSquares.length; i++) {
                            const thisSquare = selectedSquares[i] as HTMLElement;
                            setTimeout(() => {
                                thisSquare.classList.add("square-wiggle");
                                setTimeout(() => {
                                    for (let i = 0; i < selectedSquares.length; i++) {
                                        selectedSquares[i].classList.remove("square-wiggle");
                                    }
                                }, 800);
                            }, Math.random() * 200);
                        }
                        setTimeout(() => {
                            gameState.guessed.push(selectedIdCode);
                            gameState.remainingGuesses -= 1;
                            setRemainingGuesses(gameState.remainingGuesses);
                            if (gameState.remainingGuesses < 1) {
                                setTimeout(() => {
                                    endGame();
                                }, 0);
                            } else {
                                activateButton("submit");
                            }
                        }, 800);
                    }, 0);
                }
            }
            if (newMessages.length > 0) {
                newMessages.forEach((newMessage) => {
                    const newId = Math.random();
                    messagesObj[newId] = newMessage;
                    setTimeout(() => {
                        delete messagesObj[newId];
                        setMessagesObj(messagesObj);
                    }, 2000);
                });
                setMessagesObj(messagesObj);
            }
        }, 0);
    };

    const shuffle = () => {
        shuffleAndPopulateLooseItems();
    };

    const deselect = () => {
        gameState.looseItemsByRow.forEach((row) => {
            row.forEach((item) => {
                item.selected = false;
                deactivateButton("submit");
            });
        });
    };

    return (
        <div className="game-container">
            <GameAlertBox messagesObj={messagesObj} />
            <div>
                <br />
                Create groups of four!
                <br />
                <br />

            </div>
            <Grid
                gameState={gameState}
                pokeNum={pokeNum}
                activateButton={activateButton}
                deactivateButton={deactivateButton}
            />
            {gameOver ? (
                <div>
                    <br />
                    GAME OVER
                </div>
            ) : (
                <>
                    <GuessesBar
                        guessesLeft={remainingGuesses} 
                    />
                    <GameControlsBar 
                        submit={submit}
                        shuffle={shuffle}
                        deselect={deselect}
                        inactiveList={inactiveButtons}
                    />
                </>
            )}
        </div>
    );
}

// ------ helper functions

function switchElementsByIdPairs(idPairs: number[][]): Promise<void> {
    const switchTime = 1000;
    const startDelayTime = 200;
    const endDelayTime = 200;
    return new Promise((resolve) => {
        idPairs.forEach((pair) => {
            switchElementPair(pair, switchTime, startDelayTime, endDelayTime);
        });
        setTimeout(() => {
            resolve();
        }, switchTime);
    });
}

function switchElementPair(idPair: number[], switchTime: number, startDelayTime: number, endDelayTime: number): void {
    const topEle = document.getElementById(idPair[0].toString());
    const bottomEle = document.getElementById(idPair[1].toString());
    const topRect = topEle!.getBoundingClientRect();
    const bottomRect = bottomEle!.getBoundingClientRect();
    const topPos = [topRect.left, topRect.top];
    const bottomPos = [bottomRect.left, bottomRect.top];
    const topJourney = [bottomPos[0] - topPos[0], bottomPos[1] - topPos[1]];
    const bottomJourney = [topPos[0] - bottomPos[0], topPos[1] - bottomPos[1]];
    const startTime = Date.now();
    const endTime = startTime + switchTime;
    animate(topEle!, topJourney, startTime, endTime, startDelayTime, endDelayTime);
    animate(bottomEle!, bottomJourney, startTime, endTime, startDelayTime, endDelayTime);
}

function animate(ele: HTMLElement, journey: number[], startTime: number, endTime: number, startDelayTime: number, endDelayTime: number): void {
    const movementStartTime = startTime + startDelayTime;
    const movementEndTime = endTime - endDelayTime;
    const now = Date.now();
    if (now > movementStartTime) {
        if (now < movementEndTime) {
            const movementTime = movementEndTime - movementStartTime;
            const elapsedTime = now - movementStartTime;
            const fraction = elapsedTime / movementTime;
            const offset = [fraction * journey[0], fraction * journey[1]];
            ele.style.transform = `translate(${offset[0]}px, ${offset[1]}px)`;
            requestAnimationFrame(() => {
                animate(ele, journey, startTime, endTime, startDelayTime, endDelayTime);
            });
        } else {
            if (now < endTime) {
                ele.style.transform = `translate(${journey[0]}px, ${journey[1]}px)`;
                requestAnimationFrame(() => {
                    animate(ele, journey, startTime, endTime, startDelayTime, endDelayTime);
                });
            } else {
                ele.style.transform = "translate(0px, 0px)";
            }
        }
    } else {
        requestAnimationFrame(() => {
            animate(ele, journey, startTime, endTime, startDelayTime, endDelayTime);
        });
    }
}

export default GameContainer;
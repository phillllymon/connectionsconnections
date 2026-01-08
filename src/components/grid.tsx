import React, { ReactElement, useState } from 'react';
import "../game.css";
import GridRow from "./gridRow";
import type { GameState, Group, Item } from "../types";


type GridProps = {
    gameState: GameState,
    pokeNum: number
};

function Grid(props: GridProps): ReactElement {
    const finishedGroups: Group[] = [];
    // const looseItems: Item[] = [];
    props.gameState.groups.forEach((group) => {
        if (group.finished) {
            finishedGroups.push(group);
        } else {
            // looseItems.push(...group.items);
        }
    });
    // shuffleInPlace(looseItems);
    // const looseItemsByRow: Item[][] = [];
    // for (let i = 0; i < looseItems.length; i += 4) {
    //     looseItemsByRow.push(looseItems.slice(i, i + 4));
    // }

    const requestItemSelect = (): Boolean => {
        let nSelected = 0;
        props.gameState.looseItemsByRow.forEach((row) => {
            row.forEach((item) => {
                if (item.selected) {
                    nSelected += 1;
                }
            })
        });
        console.log(nSelected + " selected");
        return nSelected < 4;
    };

    return (
        <div className="grid">
            {finishedGroups.map((group, i) => {
                return <GridRow finished={true} group={group} key={i} />
            })}
            {props.gameState.looseItemsByRow.map((items, i) => {
                return <GridRow
                    finished={false}
                    items={items}
                    requestItemSelect={requestItemSelect}
                    key={i} 
                />
            })}
        </div>
    );
}

export default Grid;
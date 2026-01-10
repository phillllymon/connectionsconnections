import React, { ReactElement, useState } from 'react';
import "../game.css";
import GridRow from "./gridRow";
import type { GameState, Group, Item } from "../types";


type GridProps = {
    gameState: GameState,
    pokeNum: number,
    activateButton: (buttonName: string) => void,
    deactivateButton: (buttonName: string) => void
};

function Grid(props: GridProps): ReactElement {
    const finishedGroups: Group[] = [];
    props.gameState.groups.forEach((group) => {
        if (group.finished) {
            finishedGroups.push(group);
        }
    });

    const countSelected = (): number => {
        let nSelected = 0;
        props.gameState.looseItemsByRow.forEach((row) => {
            row.forEach((item) => {
                if (item.selected) {
                    nSelected += 1;
                }
            })
        });
        return nSelected;
    };

    const requestItemSelect = (): Boolean => {
        return countSelected() < 4;
    };

    const reportSelect = (): void => {
        if (countSelected() === 4) {
            props.activateButton("submit");
        } else {
            props.deactivateButton("submit");
        }
    }

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
                    reportSelect={reportSelect}
                    key={i} 
                />
            })}
        </div>
    );
}

export default Grid;
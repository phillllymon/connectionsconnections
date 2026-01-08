import React, { ReactElement } from 'react';
import "../game.css";
import Square from "./square";
import type { Group, Item } from "../types";

type GridRowProps = {
    finished: Boolean,
    items?: Item[],
    group?: Group,
    requestItemSelect?: (item: Item) => Boolean
};

function GridRow(props: GridRowProps): ReactElement {
    if (props.finished) {
        const finishedRowLabels = props.group!.items.map((item) => {
            return item.label.toUpperCase();
        }).join(", ");
        const categoryScale = getScale(props.group!.category, 50);
        const labelsScale = getScale(finishedRowLabels, 70);
        const finishedRowClassList = `finished-row finished-${props.group?.color}`;
        return (
            <div className="grid-row">
                <div className={finishedRowClassList}>
                    <div style={{transform: `scale(${categoryScale})`}}>
                        {props.group?.category.toUpperCase()}
                    </div>
                    <div className="finished-row-labels" style={{transform: `scale(${labelsScale})`}}>
                        {finishedRowLabels}
                    </div>
                </div>
            </div>
        );
    } else {

    }
    return (
        <div className="grid-row">
            {props.items?.map((item, i) => {
                return <Square item={item} requestItemSelect={props.requestItemSelect!} key={i} />
            })}
        </div>
    );
}

function getScale(item: String, maxChars: number): number {
    if (item.length === 0) {
        return 1;
    }
    return Math.min(1, maxChars / item.length);
}

export default GridRow;
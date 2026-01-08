import React, { ReactElement, useState } from 'react';
import "../game.css";
import type { Item } from "../types";

type SquareProps = {
    item: Item,
    requestItemSelect: (item: Item) => Boolean
};

function Square(props: SquareProps): ReactElement {

    const [selected, setSelected] = useState(props.item.selected);

    const maxWordLength = 8;
    const maxLines = 4;
    const words = props.item.label.split(" ");
    let line = words[0];
    const lines: String[] = [];
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        if (line.length > 0 && line.length > maxWordLength - word.length) {
            lines.push(line);
            line = word;
        } else {
            line += ` ${word}`;
        }
    }
    if (line.length > 0) {
        lines.push(line);
    }
    const numLines = lines.length;
    const longestLineLength = Math.max(...lines.map(ele => ele.length));
    let lineLengthScale = 1;
    let lineNumScale = 1;
    if (longestLineLength > maxWordLength) {
        lineLengthScale = maxWordLength / longestLineLength;
    }
    if (numLines > maxLines) {
        lineNumScale = maxLines / numLines;
    }
    const scale = Math.min(lineLengthScale, lineNumScale);
    let className = "square";
    if (props.item.selected) {
        className = "square square-selected";
    }

    const handleSelect = () => {
        if (props.item.selected) {
            props.item.selected = false;
            setTimeout(() => {
                setSelected(false);
            }, 0);
        } else {
            if (props.requestItemSelect(props.item)) {
                props.item.selected = true;
                setTimeout(() => {
                    setSelected(true);
                });
            }
        }
    }

    return (
        <div className={className} onClick={handleSelect}>
            <div style={{transform: `scale(${scale})`}}>
                {props.item.label.toUpperCase()}
            </div>
        </div>
    );
}

export default Square;
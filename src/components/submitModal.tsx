import React, { ReactElement, useState } from 'react';
import GridRow from "./gridRow";
import TitleBlock from "./titleBlock";
import CopiableLink from "./copiableLink";
import type { Group, PuzzleData } from "../types";
import { addPuzzle } from "../api/query";
import "../game.css";


type SubmitModalProps = {
    closeModal: () => void,
    reset: () => void,
    groups: Group[],
    titleInfo: {
        title: string,
        author: string
    }
};

function SubmitModal(props: SubmitModalProps): ReactElement {

    const [buttonsActive, setButtonsActive] = useState(true);
    const [puzzleId, setPuzzleId] = useState<false | number>(false);
    
    const handleSubmit = (): void => {
        setButtonsActive(false);
        const puzzleData: PuzzleData = [
            [props.groups[0].category, props.groups[0].items.map(item => item.label)],
            [props.groups[1].category, props.groups[1].items.map(item => item.label)],
            [props.groups[2].category, props.groups[2].items.map(item => item.label)],
            [props.groups[3].category, props.groups[3].items.map(item => item.label)],
        ];
        addPuzzle(puzzleData, props.titleInfo.author, props.titleInfo.title).then((res) => {
            setPuzzleId(res.id);
        });
    };

    const handlePlayRandomPuzzle = (): void => {
        window.location.replace(`${window.location.href.split("?")[0]}`);
    };
    const handlePlayYourPuzzle = (): void => {
        window.location.replace(`${window.location.href.split("?")[0]}?id=${puzzleId}`);
    };
    const handleCreatePuzzle = (): void => {
        props.closeModal();
        props.reset();
    };

    if (puzzleId) {
        return (
            <>
                <div className="model-curtain"></div>
                <div className="model wide-model">
                    <br />
                    Success!
                    <br />
                    <br />
                    Here's a link to your puzzle:
                    <br />
                    <br />
                    <CopiableLink link={`${window.location.href.split("?")[0]}?id=${puzzleId}`} />
                    <br />
                    <br />
                    <div className="modal-buttons-bar">
                        <div className="game-control-button model-button" onClick={handlePlayRandomPuzzle}>
                            Play random puzzle
                        </div>
                        <div className="game-control-button model-button" onClick={handlePlayYourPuzzle}>
                            Play your puzzle
                        </div>
                        <div className="game-control-button model-button" onClick={handleCreatePuzzle}>
                            Create puzzle
                        </div>
                    </div>
                    
                </div>
            </>
        );
    }
    return (
        <>
            <div className="model-curtain"></div>
            <div className="model wide-model">
                <br />
                Everything look good?
                <br />
                <br />
                <TitleBlock title={props.titleInfo.title} author={props.titleInfo.author} />
                <GridRow finished={true} group={props.groups[0]} />
                <GridRow finished={true} group={props.groups[1]} />
                <GridRow finished={true} group={props.groups[2]} />
                <GridRow finished={true} group={props.groups[3]} />
                <br />
                <div className="modal-buttons-bar">
                    <div className={buttonsActive ? "game-control-button model-button" : "game-control-button model-button button-inactive"} onClick={handleSubmit}>
                        Submit puzzle
                    </div>
                    <div className={buttonsActive ? "game-control-button model-button" : "game-control-button model-button button-inactive"} onClick={props.closeModal}>
                        Cancel
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default SubmitModal;
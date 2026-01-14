import React, { ReactElement, useState } from 'react';
import SubmitModal from "./submitModal";
import type { Group } from "../types";
import "../game.css";

type CreateProps = {
    exitCreate: () => void,
    reset: () => void
};

function Create(props: CreateProps): ReactElement {
    const [submitModalOpen, setSubmitModalOpen] = useState(false);
    const [groups, setGroups] = useState<Group[]>([]);

    const [puzzleName, setPuzzleName] = useState("");
    const [author, setAuthor] = useState("");
    const [greenCategory, setGreenCategory] = useState("");
    const [greenOne, setGreenOne] = useState("");
    const [greenTwo, setGreenTwo] = useState("");
    const [greenThree, setGreenThree] = useState("");
    const [greenFour, setGreenFour] = useState("");
    const [yellowCategory, setYellowCategory] = useState("");
    const [yellowOne, setYellowOne] = useState("");
    const [yellowTwo, setYellowTwo] = useState("");
    const [yellowThree, setYellowThree] = useState("");
    const [yellowFour, setYellowFour] = useState("");
    const [blueCategory, setBlueCategory] = useState("");
    const [blueOne, setBlueOne] = useState("");
    const [blueTwo, setBlueTwo] = useState("");
    const [blueThree, setBlueThree] = useState("");
    const [blueFour, setBlueFour] = useState("");
    const [purpleCategory, setPurpleCategory] = useState("");
    const [purpleOne, setPurpleOne] = useState("");
    const [purpleTwo, setPurpleTwo] = useState("");
    const [purpleThree, setPurpleThree] = useState("");
    const [purpleFour, setPurpleFour] = useState("");

    const isValid = (): boolean => {
        let valid = true;
        [puzzleName, author].forEach((value) => {
            if (value.length < 2) {
                valid = false;
            }
        });
        [greenCategory, yellowCategory, blueCategory, purpleCategory].forEach((value) => {
            if (value.length < 3) {
                valid = false;
            }
        });
        [
            greenOne, greenTwo, greenThree, greenFour,
            yellowOne, yellowTwo, yellowThree, yellowFour,
            blueOne, blueTwo, blueThree, blueFour,
            purpleOne, purpleTwo, purpleThree, purpleFour
        ].forEach((value) => {
            if (value.length < 1) {
                valid = false;
            }
        });
        return valid;
    };

    const submitPuzzle = (): void => {
        if (isValid()) {
            const groupsToSend: Group[] = [
                {color: "green", category: greenCategory, finished: true, items: [
                    {id: 0, label: greenOne, selected: false},
                    {id: 1, label: greenTwo, selected: false},
                    {id: 2, label: greenThree, selected: false},
                    {id: 3, label: greenFour, selected: false},
                ]},
                {color: "yellow", category: yellowCategory, finished: true, items: [
                    {id: 4, label: yellowOne, selected: false},
                    {id: 5, label: yellowTwo, selected: false},
                    {id: 6, label: yellowThree, selected: false},
                    {id: 7, label: yellowFour, selected: false},
                ]},
                {color: "blue", category: blueCategory, finished: true, items: [
                    {id: 8, label: blueOne, selected: false},
                    {id: 9, label: blueTwo, selected: false},
                    {id: 10, label: blueThree, selected: false},
                    {id: 11, label: blueFour, selected: false},
                ]},
                {color: "purple", category: purpleCategory, finished: true, items: [
                    {id: 12, label: purpleOne, selected: false},
                    {id: 13, label: purpleTwo, selected: false},
                    {id: 14, label: purpleThree, selected: false},
                    {id: 15, label: purpleFour, selected: false},
                ]}
            ];
            setGroups(groupsToSend);
            setSubmitModalOpen(true);
        }
    }

    return (
        <center>
            {submitModalOpen && <SubmitModal
                closeModal={() => setSubmitModalOpen(false)}
                groups={groups}
                reset={props.reset}
                titleInfo={{
                    title: puzzleName,
                    author: author
                }}
            />}
            <br />
            Create your own connections!
            <br />
            <br />
            <div className="create">
                <div className="create-section gray-section">
                    <input className="create-input" type="text" placeholder="puzzle name" onChange={(e) => {
                        setPuzzleName(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="author name" onChange={(e) => {
                        setAuthor(e.target.value);
                    }} />
                </div>
                <div className="create-section green-section">
                    <input className="create-input" type="text" placeholder="green category name" onChange={(e) => {
                        setGreenCategory(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 1" onChange={(e) => {
                        setGreenOne(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 2" onChange={(e) => {
                        setGreenTwo(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 3" onChange={(e) => {
                        setGreenThree(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 4" onChange={(e) => {
                        setGreenFour(e.target.value);
                    }} />
                </div>
                <div className="create-section yellow-section">
                    <input className="create-input" type="text" placeholder="yellow category name" onChange={(e) => {
                        setYellowCategory(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 1" onChange={(e) => {
                        setYellowOne(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 2" onChange={(e) => {
                        setYellowTwo(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 3" onChange={(e) => {
                        setYellowThree(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 4" onChange={(e) => {
                        setYellowFour(e.target.value);
                    }} />
                </div>
                <div className="create-section blue-section">
                    <input className="create-input" type="text" placeholder="blue category name" onChange={(e) => {
                        setBlueCategory(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 1" onChange={(e) => {
                        setBlueOne(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 2" onChange={(e) => {
                        setBlueTwo(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 3" onChange={(e) => {
                        setBlueThree(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 4" onChange={(e) => {
                        setBlueFour(e.target.value);
                    }} />
                </div>
                <div className="create-section purple-section">
                    <input className="create-input" type="text" placeholder="purple category name" onChange={(e) => {
                        setPurpleCategory(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 1" onChange={(e) => {
                        setPurpleOne(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 2" onChange={(e) => {
                        setPurpleTwo(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 3" onChange={(e) => {
                        setPurpleThree(e.target.value);
                    }} />
                    <input className="create-input" type="text" placeholder="item 4" onChange={(e) => {
                        setPurpleFour(e.target.value);
                    }} />
                </div>
                <br />
            </div>
            <br />
            <div className="modal-buttons-bar">
                <div className={isValid() ? "game-control-button model-button" : "game-control-button model-button button-inactive"} onClick={submitPuzzle}>
                    Submit puzzle
                </div>
                <div className="game-control-button model-button" onClick={props.exitCreate}>
                    Back to game
                </div>
            </div>
        </center>
    )
}

export default Create;
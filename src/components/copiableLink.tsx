import React, { ReactElement } from 'react';
import "../game.css";


type CopiableLinkProps = {
    link: string
};

function CopiableLink(props: CopiableLinkProps): ReactElement {
    const copy = (): void => {
        try {
            navigator.clipboard.writeText(props.link);
        } catch (err) {

        }
    };

    return (
        <div className="horizontal">
            <div className="shortened-link">
                {props.link}
            </div>
            <div className="icon-container" onClick={copy}>
                <div className="sym-rect offset"></div>
                <div className="sym-rect"></div>
            </div>
        </div>
    )
}

export default CopiableLink;
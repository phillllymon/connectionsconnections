import React, { ReactElement, useState } from 'react';
import "../game.css";


type StarRaterProps = {
    reportRating: (rating: number) => void
};

function StarRater(props: StarRaterProps): ReactElement {
    const [stars, setStars] = useState(0);

    const handleClick = (n: number): void => {
        setStars(n);
        props.reportRating(n);
    }

    return (
        <div className="rater-row">
            <div></div>
            {[1, 2, 3, 4, 5].map((n) => {
                if (n > stars) {
                    return (
                        <div onClick={() => handleClick(n)} className="rating-star" key={n}>&#9733;</div>
                    )
                } else {
                    return (
                        <div onClick={() => handleClick(n)} className="rating-star" key={n}>&#x2B50;</div>
                    )
                }
            })}
            <div></div>
        </div>
    )
}

export default StarRater;
import React, { useState, useRef } from 'react';
import Star from "../star/index"

const StarRating = ({ totalStars = 5 }) => {
    const [selectedStars, setSelectedStars] = useState(0);
    const starRefs = useRef([]);

    const handleStarClick = (index) => {
        setSelectedStars(index + 1);
        starRefs.current[index].value = index + 1;
    };

    return (
        <div>
            {[...Array(totalStars)].map((_, index) => (
                <Star
                    key={index}
                    selected={index < selectedStars}
                    onClick={() => handleStarClick(index)}
                    ref={(el) => (starRefs.current[index] = el)}
                />
            ))}
        </div>
    );
};

export default StarRating;

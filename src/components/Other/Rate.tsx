'use client'
import React, { useState } from "react";
import * as Icon from "phosphor-react";

interface RateProps {
    currentRate: number;
    classname: string;
    onRateChange?: (newRate: number) => void; // Make onRateChange optional
}

const Rate: React.FC<RateProps> = ({ currentRate, classname, onRateChange }) => {
    const [hoveredRate, setHoveredRate] = useState<number | null>(null); // Track hovered stars

    // Function to render stars based on hover or current rate
    const renderStars = () => {
        let arrOfStar = [];
        for (let i = 1; i <= 5; i++) {
            arrOfStar.push(
                <Icon.Star
                    key={i}
                    className={classname}
                    color={i <= (hoveredRate ?? currentRate) ? "#F4D118" : "#9FA09C"} // Use hoveredRate if available, else currentRate
                    weight="fill"
                    onMouseEnter={() => onRateChange && setHoveredRate(i)} // Highlight stars on hover
                    onMouseLeave={() => setHoveredRate(null)} // Reset hover state
                    onClick={() => onRateChange?.(i)} // Call onRateChange only if it's defined
                    style={{ cursor: onRateChange ? 'pointer' : 'default' }} // Only make stars clickable if onRateChange is provided
                />
            );
        }
        return arrOfStar;
    };

    return <div className="rate flex">{renderStars()}</div>;
};

export default Rate;

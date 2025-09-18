import React, { useState } from 'react';
import { StarIcon } from './IconComponents';

interface StarRatingProps {
    rating: number;
    totalStars?: number;
    size?: string;
    readOnly?: boolean;
    onRate?: (rating: number) => void;
    className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
    rating,
    totalStars = 5,
    size = "w-5 h-5",
    readOnly = false,
    onRate,
    className = ""
}) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (rate: number) => {
        if (!readOnly && onRate) {
            onRate(rate);
        }
    };

    const handleMouseEnter = (rate: number) => {
        if (!readOnly) {
            setHoverRating(rate);
        }
    };

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoverRating(0);
        }
    };

    return (
        <div className={`flex items-center ${className}`}>
            {[...Array(totalStars)].map((_, index) => {
                const starRating = index + 1;
                const displayRating = hoverRating || rating;
                
                return (
                    <button
                        key={index}
                        type="button"
                        disabled={readOnly}
                        onClick={() => handleClick(starRating)}
                        onMouseEnter={() => handleMouseEnter(starRating)}
                        onMouseLeave={handleMouseLeave}
                        className={`cursor-${readOnly ? 'default' : 'pointer'} transition-colors duration-200`}
                        aria-label={`Rate ${starRating} star${starRating > 1 ? 's' : ''}`}
                    >
                        <StarIcon
                            className={`${size} ${displayRating >= starRating ? 'text-yellow-400' : 'text-gray-600'}`}
                            fill={displayRating >= starRating ? 'currentColor' : 'none'}
                        />
                    </button>
                );
            })}
        </div>
    );
};

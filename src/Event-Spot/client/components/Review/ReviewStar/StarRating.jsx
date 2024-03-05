import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faStarHalf,faStar} from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating, totalStars=5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const renderFullStars = () => {
    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} />
      );
    }
    return stars;
  };

  const renderHalfStar = () => {
    return hasHalfStar ? <FontAwesomeIcon icon={faStarHalf} /> : null;
  };

  const renderEmptyStars = () => {
    const remainingStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
    let stars = [];
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStarHalf} />);
    }
    return stars;
  };

  return (
    <div>
      {renderFullStars()}
      {renderHalfStar()}
      {renderEmptyStars()}
    </div>
  );
};

export default memo(StarRating);

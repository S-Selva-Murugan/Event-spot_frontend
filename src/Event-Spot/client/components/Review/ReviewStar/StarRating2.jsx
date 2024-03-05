import React,{memo} from 'react';
import Rating from 'react-rating-stars-component';

const StarRating2 = ({ rating }) => {
  const starConfig = {
    size: 30,
    value: rating,
    edit: false, // Set to true if you want the stars to be clickable
    isHalf: true, // Set to true to enable half-star ratings
    activeColor: '#ffd700', 
    emptyColor: '#cccccc', 
    halfIcon: 'star-half-alt', // Icon for half-stars (Font Awesome icon name)
    filledIcon: 'star', // Icon for filled stars (Font Awesome icon name)
    halfIconClass: 'fas fa-star-half-alt', // Class for half-star icon
    filledIconClass: 'fas fa-star' // Class for filled star icon
  };

  return (
    <div>
      <Rating {...starConfig} />
    </div>
  );
};

export default memo(StarRating2);

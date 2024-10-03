// Card.js
import React, { useState } from 'react';
import './Card.css'; // Import your CSS

const Card = ({ imageUrl, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`card ${isHovered ? 'hovered' : ''}`} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageUrl} alt={title} className="card-image" />
      {isHovered && (
        <div className={`card-text ${isHovered ? "show" : ""}`}>
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
        </div>
      )}
    </div>
  );
};

export default Card;

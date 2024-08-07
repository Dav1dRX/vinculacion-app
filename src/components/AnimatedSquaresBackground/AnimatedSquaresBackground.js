import React from 'react';
import './AnimatedSquaresBackground.css';

const AnimatedSquaresBackground = () => {
  return (
    <div className="animated-squares-background">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="square" style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 2}s`,
          animationDelay: `${Math.random() * 2}s`
        }}></div>
      ))}
    </div>
  );
};

export default AnimatedSquaresBackground;
import React, { useState } from 'react';
import './App.css';

function colourAni() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="App">
      <div
        className="card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`card-content ${isHovered ? 'hovered' : ''}`}>
          <h1>Pro</h1>
          <h2>${20}/month</h2>
          <p>Everything in Hobby, plus</p>
          <ul>
            <li>Unlimited completions</li>
            <li>500 fast premium requests per month</li>
            <li>Unlimited slow premium requests</li>
            <li>10 o1-mini uses per day</li>
          </ul>
          <button>GET STARTED</button>
        </div>
        <div className={`card-gradient ${isHovered ? 'hovered' : ''}`}></div>
      </div>
    </div>
  );
}

export default colourAni;
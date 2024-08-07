import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import AnimatedSquaresBackground from '../AnimatedSquaresBackground/AnimatedSquaresBackground';
import './LandingPage.css';

const LandingPage = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  return (
    <div className={`landing-page ${isExiting ? 'exiting' : ''}`}>
      <AnimatedSquaresBackground />
      <div className="content">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/2784/2784403.png" 
          alt="Logo" 
          className="logo animate-fade-left"
          style={{animationDelay: '0.2s'}}
        />
        <Typography variant="h2" className="title animate-fade-left" style={{animationDelay: '0.4s'}}>
          Sistema de Vinculación
        </Typography>
        <Typography variant="h5" className="subtitle animate-fade-left" style={{animationDelay: '0.6s', color: 'white'}}>
          Gestión eficiente de vinculaciones estudiantiles
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleEnter}
          className="enter-button animate-fade-left"
          style={{animationDelay: '0.8s'}}
        >
          ENTRAR
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
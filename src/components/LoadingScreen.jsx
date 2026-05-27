import React, { useEffect, useState } from 'react';
import Logo from '../assets/Logo.svg';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out after the 2s animation plus a short pause
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
    }, 2200);

    // Call onComplete after the fade out transition finishes
    const unmountTimer = setTimeout(() => {
      onComplete();
    }, 2700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen-container ${fadingOut ? 'fade-out' : ''}`}>
      <div className="loading-logo-wrapper">
        <img src={Logo} alt="Loadoing Base" className="loading-logo-base" />
        <div className="loading-logo-fill-wrapper">
          <div 
            className="loading-logo-fill"
            style={{
              WebkitMask: `url(${Logo}) no-repeat center / contain`,
              mask: `url(${Logo}) no-repeat center / contain`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

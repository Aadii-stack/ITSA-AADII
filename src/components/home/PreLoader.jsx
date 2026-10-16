import React, { useEffect, useState } from 'react';
import './PreLoader.css';
import logo from '../../assets/itsa-logo.png'; // Corrected filename

const PreLoader = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 700);
    }, 2400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`intro-preloader-overlay ${isFading ? 'fade-exit' : ''}`}>
      <div className="intro-container">
        <div className="logo-ring-wrapper">
          <svg className="ring-svg" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" className="ring-path" />
          </svg>
          <img src={logo} alt="ITSA Logo" className="intro-logo" />
        </div>

        <div className="divider-line"></div>

        <div className="intro-text-box">
          <h2 className="intro-title">ITSA</h2>
          <p className="intro-sub">INFORMATION TECHNOLOGY STUDENT ASSOCIATION</p>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
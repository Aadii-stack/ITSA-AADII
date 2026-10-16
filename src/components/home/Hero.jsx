import React, { useEffect, useState } from 'react';
import './Hero.css';
import heroBg from '../../assets/hero-bg.png';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate scroll opacity and zoom exit effect
  const scrollProgress = Math.min(scrollY / 400, 1);
  const contentOpacity = 1 - scrollProgress;
  const contentScale = 1 - scrollProgress * 0.08;
  const contentTranslateY = scrollProgress * 60;

  return (
    <section className="hero-wrapper">
      <div 
        className="hero-bg-layer" 
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      <div className="film-grain" />
      <div className="bg-grid-theme" />

      <div 
        className="hero-content-container animated-hero-content"
        style={{
          opacity: contentOpacity,
          transform: `scale(${contentScale}) translateY(${contentTranslateY}px)`
        }}
      >
        <p className="hero-dept-name">
            <span className="college-title">SHREE L.R. TIWARI COLLEGE OF ENGINEERING</span>
          </p>

        <div className="hero-center-col">
          <div className="hero-badge">
            <span className="badge-line"></span>
            <span className="badge-text">DEPARTMENT OF INFORMATION TECHNOLOGY</span>
            <span className="badge-line"></span>
          </div>

          <h1 className="hero-heading">
            INFORMATION <span className="gold-text">TECHNOLOGY</span><br />
            STUDENT ASSOCIATION
          </h1>

          <a href="#make-it-happen" className="explore-btn">
            ↓ EXPLORE
          </a>
        </div>
      </div>

      <div className="slide-counter-floating">
        <span className="counter-current">01</span>
        <span className="counter-divider">/</span>
        <span className="counter-total">04</span>
      </div>
    </section>
  );
};

export default Hero;
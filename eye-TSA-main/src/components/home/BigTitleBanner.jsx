import React, { useEffect, useState, useRef } from 'react';
import './BigTitleBanner.css';

const BigTitleBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (bannerRef.current) observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="make-it-happen" className="big-title-section" ref={bannerRef}>
      <div className={`big-title-glow-bg ${isVisible ? 'active' : ''}`} />
      
      <div className={`big-title-container ${isVisible ? 'animate-in' : ''}`}>
        <span className="aesthetic-tag">/// OUR UNCOMPROMISING MOTTO</span>
        
        <h1 className="aesthetic-big-heading">
          <div className="title-line-1">
            <span className="word word-1">MAKE</span>{' '}
            <span className="word word-2 gold-stroke">IT</span>
          </div>
          <div className="title-line-2">
            <span className="word word-3">HAPPEN</span>
            <span className="accent-dot">.</span>
          </div>
        </h1>
        <p className="aesthetic-subtext">
          Ideas become events. Events become experiences. Experiences become the ITSA story.
        </p>
      </div>
    </section>
  );
};

export default BigTitleBanner;
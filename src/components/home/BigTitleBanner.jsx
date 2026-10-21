import React, { useEffect, useState, useRef } from 'react';
import TechText from '../ui/TechText';
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
        
        <div
          className="tech-text-wrapper"
          style={{ width: '100%', height: '260px', position: 'relative', margin: '24px auto', maxWidth: '1100px' }}
        >
          <TechText
            text="MAKE IT HAPPEN"
            fontWeight={400}
            fontSize={130}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={6}
            intro="metrics"
            introDuration={2.8}
            clickKick={true}
            draggable={true}
            guides={false}
            fontFamily="'Bevan', Georgia, 'Times New Roman', serif"
            letterSpacing={-0.02}
            accentColor="#ffffff"
            lineStyle="solid"
            strokeWidth={1.25}
            bounce={0.75}
            color="#b793d2"
            sweep={true}
          />
        </div>

        <p className="aesthetic-subtext">
          Ideas become events. Events become experiences. Experiences become the ITSA story.
        </p>
      </div>
    </section>
  );
};

export default BigTitleBanner;

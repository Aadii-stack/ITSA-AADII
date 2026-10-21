'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TechText from '../ui/TechText';
import heroVideo from '../../assets/hero_section.mp4';
import heroPoster from '../../assets/hero-bg.png';
import './Hero.css';

export default function Hero() {
  const heroWrapperRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mottoEl = heroWrapperRef.current?.querySelector('.hero-motto');
    const ctaWrap = heroWrapperRef.current?.querySelector('.hero-cta-wrap');

    let tl = null;
    if (prefersReducedMotion) {
      if (mottoEl) { mottoEl.style.opacity = '1'; mottoEl.style.transform = 'none'; }
      if (ctaWrap) { ctaWrap.style.opacity = '1'; ctaWrap.style.transform = 'none'; }
    } else {
      tl = gsap.timeline();

      // Motto: Make it happen
      if (mottoEl) {
        tl.to(mottoEl, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 });
      }

      // Explore CTA
      if (ctaWrap) {
        tl.to(ctaWrap, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
      }
    }

    return () => {
      if (tl) tl.kill();
    };
  }, []);

  const handleExploreClick = (e) => {
    e.preventDefault();
    const target = document.querySelector('#make-it-happen');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-container" id="hero" ref={heroWrapperRef}>
      {/* Video Background with Poster Fallback */}
      <div className="hero-video-bg" aria-hidden="true">
        <video
          className="hero-bg-video"
          src={heroVideo}
          poster={heroPoster}
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-video-overlay" />
      </div>

      {/* Decorative Grid Overlay */}
      <div className="hero-grid-overlay" aria-hidden="true" />

      {/* Full Hero Canvas for ITSA TechText: Allows dragging letters anywhere across the entire hero section */}
      <div className="hero-tech-text-full" aria-hidden="false">
        <TechText
          text="ITSA"
          fontWeight={700}
          fontSize={180}
          reveal="letter"
          dashLength={4}
          dashGap={2}
          specks={8}
          intro="metrics"
          introDuration={2.6}
          clickKick={true}
          draggable={true}
          guides={false}
          fontFamily="'Bevan', Georgia, 'Times New Roman', serif"
          letterSpacing={0.04}
          accentColor="#b793d2"
          lineStyle="solid"
          strokeWidth={1.5}
          bounce={0.75}
          color="#ffffff"
          sweep={true}
          anchorSelector="#hero-headline-anchor"
        />
      </div>

      <div className="hero-content">
        {/* Anchor placeholder defining the resting slot for ITSA */}
        <div id="hero-headline-anchor" className="hero-headline-wrap" style={{ width: '100%', maxWidth: '820px', height: '240px', pointerEvents: 'none' }} />

        {/* Subtitle: Make it happen */}
        <div className="hero-motto" id="hero-motto">
          <span>Make it happen</span>
        </div>

        {/* CTA: Hardened Accessible Explore Pill Button */}
        <div className="hero-cta-wrap" id="hero-cta">
          <a
            href="#make-it-happen"
            className="hero-explore-cta"
            onClick={handleExploreClick}
            aria-label="Explore ITSA overview and initiatives"
          >
            <span className="hero-explore-inner">
              <span className="hero-explore-text">EXPLORE</span>
              <span className="hero-explore-arrow" aria-hidden="true">→</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TechText from '../ui/TechText';
import heroVideo from '../../assets/hero_section.mp4';
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

  return (
    <section className="hero-container" id="hero" ref={heroWrapperRef}>
      {/* Video Background */}
      <div className="hero-video-bg" aria-hidden="true">
        <video
          className="hero-bg-video"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-video-overlay" />
      </div>

      {/* Decorative Grid Overlay */}
      <div className="hero-grid-overlay" aria-hidden="true" />

      <div className="hero-content">
        {/* Headline: ITSA rendered with TechText from React Bits */}
        <div className="hero-headline-wrap" style={{ width: '100%', maxWidth: '820px', pointerEvents: 'auto' }}>
          <div style={{ width: '100%', height: '240px', position: 'relative' }}>
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
              accentColor="#ffffff"
              lineStyle="solid"
              strokeWidth={1.5}
              bounce={0.75}
              color="#b793d2"
              sweep={true}
            />
          </div>
        </div>

        {/* Subtitle: Make it happen */}
        <div className="hero-motto" id="hero-motto">
          <span>Make it happen</span>
        </div>

        {/* CTA: Explore */}
        <div className="hero-cta-wrap" id="hero-cta">
          <a href="#make-it-happen" className="hero-cta-btn" id="cta-button" aria-label="Explore ITSA overview section">
            <span>Explore</span>
            <span className="cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

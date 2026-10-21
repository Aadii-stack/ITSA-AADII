'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import heroVideo from '../../assets/hero_section.mp4';
import './Hero.css';

export default function Hero() {
  const heroWrapperRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- GSAP ANIMATION ELEMENTS ---
    const wordInfo = heroWrapperRef.current?.querySelector('.word-information');
    const wordTech = heroWrapperRef.current?.querySelector('.word-technology');
    const wordStudent = heroWrapperRef.current?.querySelector('.word-student');
    const wordAssoc = heroWrapperRef.current?.querySelector('.word-association');
    const mottoEl = heroWrapperRef.current?.querySelector('.hero-motto');
    const ctaWrap = heroWrapperRef.current?.querySelector('.hero-cta-wrap');

    let tl = null;
    if (prefersReducedMotion) {
      [wordInfo, wordTech, wordStudent, wordAssoc].forEach(el => {
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
      if (mottoEl) { mottoEl.style.opacity = '1'; mottoEl.style.transform = 'none'; }
      if (ctaWrap) { ctaWrap.style.opacity = '1'; ctaWrap.style.transform = 'none'; }
    } else {
      tl = gsap.timeline();

      if (wordInfo) gsap.set(wordInfo, { y: -170, opacity: 0, scale: 0.95 });
      if (wordTech) gsap.set(wordTech, { x: -280, opacity: 0, scale: 0.95 });
      if (wordStudent) gsap.set(wordStudent, { x: 280, opacity: 0, scale: 0.95 });
      if (wordAssoc) gsap.set(wordAssoc, { y: 170, opacity: 0, scale: 0.95 });

      // Phase 1: Fast inward rush to collision point
      tl.to(wordInfo, { y: 4, opacity: 1, scale: 1, duration: 0.46, ease: 'power3.in' }, 0.05);
      tl.to(wordAssoc, { y: -4, opacity: 1, scale: 1, duration: 0.46, ease: 'power3.in' }, 0.05);
      tl.to(wordTech, { x: 4, opacity: 1, scale: 1, duration: 0.46, ease: 'power3.in' }, 0.05);
      tl.to(wordStudent, { x: -4, opacity: 1, scale: 1, duration: 0.46, ease: 'power3.in' }, 0.05);

      // Phase 2: Instant elastic recoil away from each other
      tl.to(wordTech, {
        keyframes: [
          { x: -16, duration: 0.16, ease: 'power2.out' },
          { x: 3, duration: 0.14, ease: 'power2.inOut' },
          { x: 0, duration: 0.18, ease: 'power3.out' }
        ]
      }, 0.51);

      tl.to(wordStudent, {
        keyframes: [
          { x: 16, duration: 0.16, ease: 'power2.out' },
          { x: -3, duration: 0.14, ease: 'power2.inOut' },
          { x: 0, duration: 0.18, ease: 'power3.out' }
        ]
      }, 0.51);

      tl.to(wordInfo, {
        keyframes: [
          { y: -12, duration: 0.16, ease: 'power2.out' },
          { y: 2, duration: 0.14, ease: 'power2.inOut' },
          { y: 0, duration: 0.18, ease: 'power3.out' }
        ]
      }, 0.51);

      tl.to(wordAssoc, {
        keyframes: [
          { y: 12, duration: 0.16, ease: 'power2.out' },
          { y: -2, duration: 0.14, ease: 'power2.inOut' },
          { y: 0, duration: 0.18, ease: 'power3.out' }
        ]
      }, 0.51);

      // Impact vibration
      tl.to('.hero-headline', {
        keyframes: [
          { scale: 1.03, duration: 0.08, ease: 'power1.out' },
          { scale: 0.99, duration: 0.1, ease: 'power1.inOut' },
          { scale: 1, duration: 0.12, ease: 'power2.out' }
        ]
      }, 0.51);

      // Motto: Make it happen
      if (mottoEl) {
        tl.to(mottoEl, { opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.8)' }, '-=0.2');
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
        {/* Headline: INFORMATION TECHNOLOGY STUDENT ASSOCIATION */}
        <div className="hero-headline-wrap">
          <h1 className="hero-headline" id="hero-headline" aria-label="Information Technology Student Association">
            <span className="headline-line line-top">
              <span className="headline-word word-information">INFORMATION</span>
            </span>
            <span className="headline-line line-middle">
              <span className="headline-word word-technology">TECHNOLOGY</span>
              <span className="headline-word word-student">STUDENT</span>
            </span>
            <span className="headline-line line-bottom">
              <span className="headline-word word-association">ASSOCIATION</span>
            </span>
          </h1>
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

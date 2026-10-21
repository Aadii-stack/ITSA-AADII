'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TechText from '../ui/TechText';
import { ShaderButtons } from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';
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

    // Scroll smoothly to overview if iframe is clicked
    const onIframeBlur = () => {
      if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
        const frame = heroWrapperRef.current?.querySelector('.hero-shader-frame iframe');
        if (document.activeElement === frame) {
          const target = document.querySelector('#make-it-happen');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          window.focus();
        }
      }
    };
    window.addEventListener('blur', onIframeBlur);

    return () => {
      if (tl) tl.kill();
      window.removeEventListener('blur', onIframeBlur);
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

        {/* CTA: Explore with ShaderButtons (Star Portal) */}
        <div className="hero-cta-wrap" id="hero-cta">
          <a
            href="#make-it-happen"
            className="hero-shader-btn-link"
            onClick={handleExploreClick}
            aria-label="Explore ITSA overview section"
          >
            <div className="shader-frame hero-shader-frame">
              <ShaderButtons
                mode="dark"
                hue={0}
                saturation={1.00}
                brightness={1.00}
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

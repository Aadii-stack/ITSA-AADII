import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { metaSummitConfig } from '../../data/metaSummit';
import { CheckCircle2 } from 'lucide-react';
import { Reveal, MaskReveal } from './Reveal';
import { WebCorner, WebEmblem, TetherLine } from './MetaDecor';
import './MetaOverview.css';

export default function MetaOverview() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const posterRef = useRef(null);

  // The convention concept recedes as the reader moves towards the archive.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const recedeScale = useTransform(scrollYProgress, [0.45, 1], [1, 0.978]);
  const recedeOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0.6]);

  // Oversized background word slides and thins out as the archive takes over.
  const ghostX = useTransform(scrollYProgress, [0, 1], ['-4%', '26%']);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.9, 0.3]);

  // Poster panel gains depth on scroll.
  const { scrollYProgress: posterProgress } = useScroll({
    target: posterRef,
    offset: ['start end', 'end start'],
  });
  const posterY = useTransform(posterProgress, [0, 1], ['7%', '-7%']);
  const posterTilt = useTransform(posterProgress, [0, 0.5, 1], [7, 0, -7]);

  return (
    <section
      ref={sectionRef}
      className="meta-overview-section section-py meta-hairline"
      aria-labelledby="meta-overview-heading"
    >
      <TetherLine className="meta-overview-tether" />

      <motion.span
        className="meta-ghost-word meta-ghost-overview"
        aria-hidden="true"
        style={reduce ? undefined : { x: ghostX, opacity: ghostOpacity }}
      >
        Innovation
      </motion.span>
      <WebCorner className="meta-overview-web" orientation="tl" />
      <WebCorner className="meta-overview-web-br" orientation="br" />

      <motion.div
        className="meta-overview-recede"
        style={
          reduce
            ? undefined
            : { scale: recedeScale, opacity: recedeOpacity, transformPerspective: 1200 }
        }
      >
        <div className="container-wide meta-overview-inner">
          <div className="meta-overview-grid">
            {/* Narrative Column */}
            <div className="overview-narrative">
              <Reveal>
                <div className="circuit-label">
                  <span className="circuit-dot"></span>
                  01 / Convention Concept
                </div>
              </Reveal>
              <MaskReveal delay={0.08}>
                <h2 id="meta-overview-heading" className="section-title">
                  What is Meta Summit?
                </h2>
              </MaskReveal>

              <div className="narrative-paragraphs">
                {metaSummitConfig.overview.map((para, idx) => (
                  <Reveal key={idx} delay={0.12 + idx * 0.08}>
                    {idx === 0 ? (
                      <div className="overview-lead-wrap">
                        <motion.span
                          className="lead-accent"
                          aria-hidden="true"
                          initial={reduce ? false : { scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.85, ease: 'easeOut', delay: 0.35 }}
                        />
                        <p className="overview-p overview-p--lead">{para}</p>
                      </div>
                    ) : (
                      <p className="overview-p">{para}</p>
                    )}
                  </Reveal>
                ))}
              </div>

              <MaskReveal delay={0.16} from="inset(0 100% 0 0)" className="overview-highlights-wrap">
                <div className="overview-highlights-box">
                  <span className="highlights-label font-mono">CONVENTION TENETS</span>
                  <ul className="highlights-list">
                    <li>
                      <CheckCircle2 size={16} className="highlight-icon" />
                      <span>Interactive coding labs rather than theoretical lectures</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} className="highlight-icon" />
                      <span>Student capstone exhibitions & live architecture critiques</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} className="highlight-icon" />
                      <span>Cross-domain collaboration uniting frontend, backend, and AI</span>
                    </li>
                  </ul>
                </div>
              </MaskReveal>
            </div>

            {/* Poster / Visual Showcase Column */}
            <Reveal delay={0.15} className="overview-poster-col">
              <div ref={posterRef} className="summit-poster-parallax">
                <motion.div
                  className="summit-poster-tilt"
                  style={reduce ? undefined : { y: posterY, rotateX: posterTilt }}
                >
                  <div className="summit-poster-card">
                    <span className="poster-frame-sweep" aria-hidden="true" />
                    <div className="card-node tl"></div>
                    <div className="card-node tr"></div>
                    <div className="card-node bl"></div>
                    <div className="card-node br"></div>

                    <div className="summit-poster-card-inner">
                      <div className="poster-container-inner">
                        <span className="poster-light-sweep" aria-hidden="true" />
                        <WebCorner className="poster-web" />
                        {metaSummitConfig.posterImage ? (
                          <img
                            src={metaSummitConfig.posterImage}
                            alt="Official Meta Summit Poster"
                            className="summit-poster-img"
                          />
                        ) : (
                          <div className="summit-poster-placeholder">
                            <div className="summit-badge-icon">
                              <WebEmblem className="summit-emblem" />
                            </div>

                            <div className="placeholder-info-block">
                              <span className="edition-sup font-mono">ITSA FLAGSHIP EDITION</span>
                              <h3 className="summit-brand-name">META SUMMIT</h3>
                              <p className="college-sub font-mono">
                                SLRTCE • MUMBAI METROPOLITAN REGION
                              </p>
                            </div>

                            <div className="poster-slot-notice">
                              <span className="notice-badge font-mono">OFFICIAL POSTER SPACE</span>
                              <p className="notice-sub">
                                Approved visual artwork, verified schedule and guest details will be
                                mounted here upon official release.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

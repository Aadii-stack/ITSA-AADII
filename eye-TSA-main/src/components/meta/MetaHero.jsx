import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { metaSummitConfig } from '../../data/metaSummit';
import { Bell } from 'lucide-react';
import { WebCorner, SpiderMotif, TetherLine } from './MetaDecor';
import { META_EASE } from './Reveal';
import cityHero from '../../assets/meta/meta-city-hero.png';
import cityFar from '../../assets/meta/meta-city-texture.png';
import './MetaHero.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 1.05 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: META_EASE } },
};

// Masked rise + a touch of depth, then the shadow separation settles (CSS).
const titleClip = {
  hidden: { y: '108%', scale: 1.06, opacity: 0 },
  show: {
    y: '0%',
    scale: 1,
    opacity: 1,
    transition: { duration: 1.15, ease: META_EASE, delay: 1.1 },
  },
};

export default function MetaHero({ onOpenInterestModal }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  // Desktop pointers only: the skyline answers to the cursor.
  const finePointer = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    []
  );
  const usePointer = !reduce && finePointer;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Two skyline planes at different speeds, plus the whole set receding.
  const farY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const nearY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const cityZoom = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const backdropOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);
  const veilOpacity = useTransform(scrollYProgress, [0.15, 1], [0, 0.9]);
  const trailX = useTransform(scrollYProgress, [0.05, 0.95], ['-35%', '115%']);
  const trailOpacity = useTransform(scrollYProgress, [0.05, 0.4, 0.95], [0, 0.85, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // The title drifts out of focus as the scene hands off to the convention.
  const titleBlur = useTransform(scrollYProgress, [0.1, 0.62], [0, 7]);
  const titleFilter = useTransform(titleBlur, (value) => `blur(${value}px)`);

  const pointerX = useMotionValue(0);
  const depthX = useSpring(useTransform(pointerX, [-0.5, 0.5], [10, -10]), { stiffness: 40, damping: 20 });

  const handlePointerMove = (event) => {
    if (!usePointer) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="meta-hero-section"
      aria-labelledby="meta-summit-title"
      onPointerMove={usePointer ? handlePointerMove : undefined}
      onPointerLeave={usePointer ? resetPointer : undefined}
    >
      {/* Cinematic night skyline: two parallax planes, city lights, atmosphere */}
      <motion.div
        className="meta-hero-backdrop"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.35, ease: 'easeOut' }}
      >
        <motion.div
          className="meta-hero-recede"
          style={
            reduce
              ? undefined
              : { opacity: backdropOpacity, scale: cityZoom, x: depthX }
          }
        >
          <motion.div className="meta-hero-city-far" style={reduce ? undefined : { y: farY }}>
            <img src={cityFar} alt="" />
          </motion.div>
          <motion.div className="meta-hero-city" style={reduce ? undefined : { y: nearY }}>
            <img src={cityHero} alt="" />
          </motion.div>
          <div className="meta-hero-atmo meta-hero-atmo-red" />
          <div className="meta-hero-atmo meta-hero-atmo-blue" />
          <div className="meta-hero-lights" />
          <div className="meta-hero-particles" />
          <div className="meta-hero-skyline-sweep" />
          <div className="meta-hero-grain" />
        </motion.div>

        {/* Entrance opens from darkness; the scene then sinks back into it */}
        <motion.div
          className="meta-hero-darkness"
          initial={reduce ? false : { opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.9, ease: 'easeOut' }}
        />
        <motion.div
          className="meta-hero-veil"
          style={reduce ? { opacity: 0.55 } : { opacity: veilOpacity }}
        />
        <motion.span
          className="meta-hero-trail"
          style={reduce ? undefined : { x: trailX, opacity: trailOpacity }}
        />
      </motion.div>

      {/* Fine web geometry */}
      <WebCorner className="meta-hero-web" />
      <SpiderMotif className="meta-hero-spider" />

      <div className="container-wide meta-hero-container">
        <motion.div
          className="meta-hero-content"
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          variants={container}
          initial={reduce ? false : 'hidden'}
          animate="show"
        >
          <motion.span
            className="meta-hero-title-mask"
            style={reduce ? undefined : { filter: titleFilter }}
          >
            <motion.h1
              id="meta-summit-title"
              className="meta-hero-headline"
              variants={titleClip}
            >
              COMING SOON!!
            </motion.h1>
          </motion.span>

          <motion.p className="meta-hero-tagline-motto font-display" variants={item}>
            {metaSummitConfig.headline}
          </motion.p>

          <motion.div className="meta-hero-below" variants={item}>
            <span className="meta-hero-status">
              <span className="status-tick" aria-hidden="true" />
              <span className="status-word font-mono">{metaSummitConfig.status}</span>
            </span>
            <button
              type="button"
              onClick={onOpenInterestModal}
              className="btn btn-primary btn-lg notify-btn"
            >
              <Bell size={18} />
              <span>Notify Me When Registrations Open</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Web tether handing the eye over to the next section */}
      <span className="meta-hero-tether-slot" aria-hidden="true">
        <TetherLine className="meta-hero-tether-line" delay={0.1} />
      </span>
    </section>
  );
}

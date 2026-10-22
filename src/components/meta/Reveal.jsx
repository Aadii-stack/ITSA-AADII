import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const META_EASE = [0.16, 1, 0.3, 1];

export function Reveal({ children, delay = 0, y = 28, duration = 0.75, className }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: META_EASE }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer = (staggerChildren, delayChildren = 0.05) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: META_EASE } },
};

export function Stagger({ children, className, stagger = 0.12, delayChildren = 0.05 }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/*
 * Masked wipe reveal — content is uncovered by an inset clip rather
 * than a translate, so nothing shifts the surrounding layout.
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  from = 'inset(0 0 100% 0)',
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: from, opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        clipPath: { duration, delay, ease: META_EASE },
        opacity: { duration: 0.35, delay },
      }}
    >
      {children}
    </motion.div>
  );
}

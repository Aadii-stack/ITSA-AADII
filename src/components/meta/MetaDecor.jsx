import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { META_EASE } from './Reveal';

/*
 * Fine corner spider-web that draws itself in when scrolled into view.
 * Anchor corner is top-right inside the 200x200 viewBox; use the
 * orientation modifiers (meta-web--tl / --bl / --br) to flip it.
 */
const STRANDS = [
  'M200 0 L15 0',
  'M200 0 L70 6',
  'M200 0 L118 22',
  'M200 0 L157 48',
  'M200 0 L184 84',
  'M200 0 L200 128',
  'M200 0 L200 185',
];

const ARCS = [
  'M85.3 0 Q123.83 1.44 119.4 3.7',
  'M119.4 3.7 Q148.74 6.75 149.16 13.6',
  'M149.16 13.6 Q169.78 16.93 173.34 29.8',
  'M173.34 29.8 Q185.73 31.94 190.08 52.1',
  'M190.08 52.1 Q196.13 51.29 200 79.4',
  'M200 79.4 Q200 75.7 200 114.7',
];

export function WebCorner({ className = '', orientation = '' }) {
  const reduce = useReducedMotion();
  const paths = [...STRANDS, ...ARCS];

  if (reduce) {
    return (
      <svg
        className={`meta-web ${orientation ? `meta-web--${orientation}` : ''} ${className}`}
        viewBox="0 0 200 200"
        aria-hidden="true"
        focusable="false"
      >
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    );
  }

  return (
    <svg
      className={`meta-web ${orientation ? `meta-web--${orientation}` : ''} ${className}`}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.4,
            delay: 0.15 + i * 0.09,
            ease: META_EASE,
          }}
        />
      ))}
    </svg>
  );
}

/*
 * Tiny, discreet spider suspended from a thin thread. Sways gently.
 */
export function SpiderMotif({ className = '', style }) {
  return (
    <svg
      className={`meta-spider ${className}`}
      style={style}
      viewBox="0 0 48 96"
      aria-hidden="true"
      focusable="false"
    >
      <line className="spider-thread" x1="24" y1="0" x2="24" y2="40" />
      <g className="spider-sway">
        <path className="spider-leg" d="M20 46 C12 43 8 38 5 32" />
        <path className="spider-leg" d="M19 52 C11 51 6 48 2 43" />
        <path className="spider-leg" d="M19 58 C12 59 7 58 3 55" />
        <path className="spider-leg" d="M20 63 C14 66 10 68 7 72" />
        <path className="spider-leg" d="M28 46 C36 43 40 38 43 32" />
        <path className="spider-leg" d="M29 52 C37 51 42 48 46 43" />
        <path className="spider-leg" d="M29 58 C36 59 41 58 45 55" />
        <path className="spider-leg" d="M28 63 C34 66 38 68 41 72" />
        <circle className="spider-body-fill" cx="24" cy="43" r="4.5" />
        <ellipse className="spider-body-fill" cx="24" cy="56" rx="6.5" ry="9" />
      </g>
    </svg>
  );
}

/*
 * A single fine strand that draws itself horizontally, used for the
 * hero entrance and to bridge one section into the next.
 */
const STRAND_PATH = 'M0 14 C 74 2, 148 26, 226 12 S 372 2, 460 18';

export function WebStrand({ className = '', delay = 0 }) {
  const reduce = useReducedMotion();

  return (
    <svg
      className={`meta-strand ${className}`}
      viewBox="0 0 460 28"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {reduce ? (
        <path d={STRAND_PATH} />
      ) : (
        <motion.path
          d={STRAND_PATH}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.6, delay, ease: META_EASE }}
        />
      )}
    </svg>
  );
}

/*
 * Vertical web tether: the thin line a section "hangs" from.
 */
export function TetherLine({ className = '', delay = 0 }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={`meta-tether ${className}`} aria-hidden="true" />;
  }

  return (
    <motion.span
      className={`meta-tether ${className}`}
      aria-hidden="true"
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.1, delay, ease: META_EASE }}
    />
  );
}

const RADIALS = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return `M32 32 L${(32 + 26 * Math.cos(rad)).toFixed(2)} ${(32 + 26 * Math.sin(rad)).toFixed(2)}`;
});

/*
 * Circular web emblem with a tiny spider at its centre (poster mark).
 */
export function WebEmblem({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      width="72"
      height="72"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="1.4" fill="none">
        {RADIALS.map((d) => (
          <path key={d} d={d} />
        ))}
        <circle cx="32" cy="32" r="8" />
        <circle cx="32" cy="32" r="16" />
        <circle cx="32" cy="32" r="24" />
      </g>
      <circle cx="32" cy="29" r="2.4" fill="currentColor" />
      <ellipse cx="32" cy="34.5" rx="2.8" ry="4" fill="currentColor" />
    </svg>
  );
}

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './ConcaveCarousel.css';

/**
 * ConcaveCarousel Component
 * A 3D curved gallery wall that bends around the viewer with infinite looping.
 *
 * Configurable Props:
 * - images: Array of { src, title, subtitle, category, desc, id, href }
 * - startIndex: Initial centered index (default: 0)
 * - curvature: 0 (flat) to 1 (tight drum), default: 0.72
 * - distance: Viewer distance multiplier, default: 4
 * - tilt: Viewing angle in degrees, default: 0
 * - autoplay: 'drift' | 'step' | 'off', default: 'drift'
 * - speed: Drift speed in panels per second, default: 0.16
 * - interval: Seconds per step when autoplay='step', default: 3.5
 * - aspect: Width / Height aspect ratio, default: 1.25
 * - gap: Gap in pixels between panels, default: 20
 * - radius: Corner radius in pixels, default: 16
 * - reflection: Floor reflection intensity (0 to 1), default: 0.08
 * - dim: Edge fade dimming intensity (0 to 1), default: 0.4
 */
export default function ConcaveCarousel({
  images = [],
  startIndex = 0,
  curvature = 0.72,
  distance = 4,
  tilt = 0,
  autoplay = 'drift',
  speed = 0.16,
  interval = 3.5,
  aspect = 1.25,
  gap = 20,
  radius = 16,
  reflection = 0.08,
  dim = 0.4,
  className = '',
  onSelect,
}) {
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const isHoveredRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const stepTimerRef = useRef(null);

  const totalOriginal = images.length || 1;

  // Angular step between each panel along the concave arc
  // Curvature 0.72 maps to ~22 degrees per card
  const stepAngle = useMemo(() => {
    const base = 22;
    return base * (0.6 + curvature * 0.6);
  }, [curvature]);

  // Cylinder radius derived from card width, gap, and step angle
  const [panelWidth, setPanelWidth] = useState(320);

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      if (w < 480) {
        setPanelWidth(260);
      } else if (w < 768) {
        setPanelWidth(290);
      } else if (w < 1200) {
        setPanelWidth(330);
      } else {
        setPanelWidth(360);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const panelHeight = useMemo(() => Math.round(panelWidth / aspect), [panelWidth, aspect]);

  // Cylinder radius (distance from curve center)
  const radiusPx = useMemo(() => {
    const angleRad = (stepAngle * Math.PI) / 180;
    return Math.max(400, Math.round((panelWidth + gap) / angleRad));
  }, [panelWidth, gap, stepAngle]);

  // Rotation angles
  const [currentAngle, setCurrentAngle] = useState(startIndex * stepAngle);
  const angleRef = useRef(startIndex * stepAngle);
  const targetAngleRef = useRef(startIndex * stepAngle);

  // Check prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return Boolean(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  });
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const listener = (e) => setReducedMotion(e.matches);
    mq?.addEventListener?.('change', listener);
    return () => mq?.removeEventListener?.('change', listener);
  }, []);

  // Compute active centered index
  const centerSlot = Math.round(currentAngle / stepAngle);

  // Animation loop (smooth lerp + continuous drift)
  useEffect(() => {
    let running = true;

    const tick = (now) => {
      if (!running) return;
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      // Autoplay drift if active and not dragging/hovered
      if (
        autoplay === 'drift' &&
        !isDraggingRef.current &&
        !isHoveredRef.current &&
        !reducedMotion
      ) {
        targetAngleRef.current += speed * stepAngle * dt;
      }

      // Smooth lerp to target angle
      const diff = targetAngleRef.current - angleRef.current;
      if (Math.abs(diff) > 0.005) {
        angleRef.current += diff * (isDraggingRef.current ? 0.35 : 0.08);
        setCurrentAngle(angleRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [autoplay, speed, stepAngle, reducedMotion]);

  // Step autoplay timer
  useEffect(() => {
    if (autoplay !== 'step' || reducedMotion) return;

    stepTimerRef.current = setInterval(() => {
      if (!isHoveredRef.current && !isDraggingRef.current) {
        targetAngleRef.current += stepAngle;
      }
    }, interval * 1000);

    return () => {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
    };
  }, [autoplay, interval, stepAngle, reducedMotion]);

  // Hover handlers: immediately halt any movement on hover
  const handleHoverStart = () => {
    isHoveredRef.current = true;
    targetAngleRef.current = angleRef.current;
  };

  const handleHoverEnd = () => {
    isHoveredRef.current = false;
  };

  // Drag handling
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    startAngleRef.current = targetAngleRef.current;
    velocityRef.current = 0;
    containerRef.current?.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const stepDelta = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velocityRef.current = stepDelta;

    // Convert pixel delta to angle
    const angleDelta = (deltaX / panelWidth) * stepAngle * 1.1;
    targetAngleRef.current = startAngleRef.current - angleDelta;
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    containerRef.current?.releasePointerCapture?.(e.pointerId);

    // Apply momentum release
    const momentum = -(velocityRef.current / panelWidth) * stepAngle * 3;
    targetAngleRef.current += momentum;

    // Snap to nearest panel if autoplay is step or if dragging stopped slowly
    if (autoplay === 'step' || Math.abs(velocityRef.current) < 2) {
      targetAngleRef.current = Math.round(targetAngleRef.current / stepAngle) * stepAngle;
    }
  };

  // Keyboard navigation
  const rotateToOffset = useCallback((deltaPanels) => {
    targetAngleRef.current += deltaPanels * stepAngle;
  }, [stepAngle]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      rotateToOffset(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      rotateToOffset(1);
    }
  };

  // 3D Perspective distance in pixels
  const perspectivePx = Math.round(distance * panelHeight * 0.9);

  // Dynamic continuous visible slots around centerSlot
  const slotRange = 5;
  const visibleSlots = [];
  if (images && images.length > 0) {
    for (let s = centerSlot - slotRange; s <= centerSlot + slotRange; s++) {
      const origIdx = ((s % totalOriginal) + totalOriginal) % totalOriginal;
      const item = images[origIdx];
      if (!item) continue;
      const delta = s * stepAngle - currentAngle;
      if (Math.abs(delta) <= 88) {
        visibleSlots.push({
          slot: s,
          item,
          originalIndex: origIdx,
          delta,
        });
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={`concave-carousel-root ${className}`}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onPointerEnter={handleHoverStart}
      onPointerLeave={handleHoverEnd}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="3D Concave Initiatives Gallery Carousel"
      style={{
        '--panel-width': `${panelWidth}px`,
        '--panel-height': `${panelHeight}px`,
        '--panel-radius': `${radius}px`,
        '--perspective': `${perspectivePx}px`,
        '--tilt': `${tilt}deg`,
      }}
    >
      {/* 3D Scene Stage */}
      <div className="concave-stage">
        <div className="concave-wall">
          {visibleSlots.map(({ slot, item, delta }) => {
            const deltaRad = (delta * Math.PI) / 180;
            const x = Math.sin(deltaRad) * radiusPx;
            const z = (1 - Math.cos(deltaRad)) * radiusPx * curvature * 0.9;
            const rotY = -delta;

            // Dim outer edges based on angle from center
            const distRatio = Math.min(1, Math.abs(delta) / 80);
            const edgeDim = Math.pow(distRatio, 1.4) * dim;
            const isCenter = Math.abs(delta) < stepAngle * 0.5;

            return (
              <div
                key={slot}
                className={`concave-panel-wrapper ${isCenter ? 'is-active-panel' : ''}`}
                style={{
                  transform: `translate3d(${x}px, 0, ${z}px) rotateY(${rotY}deg)`,
                  zIndex: Math.round(100 - Math.abs(delta)),
                }}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                onClick={(e) => {
                  e.stopPropagation();
                  if (Math.abs(delta) > 3) {
                    targetAngleRef.current += delta;
                  }
                  if (onSelect) onSelect(item);
                }}
              >
                {/* Main Image Panel */}
                <div className="concave-panel">
                  <img
                    src={item.src}
                    alt={item.title || 'Initiative'}
                    className="concave-panel-img"
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Edge dimming vignette layer */}
                  <div
                    className="concave-dim-overlay"
                    style={{ opacity: edgeDim }}
                  />

                  {/* Gradient scrim for text legibility */}
                  <div className="concave-gradient-scrim" />

                  {/* Content Overlay */}
                  <div className="concave-panel-content">
                    {item.category && (
                      <span className="concave-category-chip">{item.category}</span>
                    )}
                    <h3 className="concave-panel-title">{item.title}</h3>
                    {item.desc && (
                      <p className="concave-panel-desc">{item.desc}</p>
                    )}
                  </div>

                  {/* Active highlight border glow */}
                  <div className="concave-border-highlight" />
                </div>

                {/* Floor Reflection */}
                {reflection > 0 && (
                  <div
                    className="concave-reflection"
                    style={{ opacity: Math.max(0, (reflection - edgeDim * 0.6)) }}
                    aria-hidden="true"
                  >
                    <img
                      src={item.src}
                      alt=""
                      className="concave-panel-img"
                      draggable={false}
                    />
                    <div className="concave-reflection-fade" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Left & Right Edge Vignettes */}
      <div className="concave-vignette-left" aria-hidden="true" />
      <div className="concave-vignette-right" aria-hidden="true" />
    </div>
  );
}

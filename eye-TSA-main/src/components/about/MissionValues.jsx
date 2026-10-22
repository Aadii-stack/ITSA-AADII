import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aboutData } from '../../data/aboutData';
import './MissionValues.css';

export default function MissionValues() {
  const { values = [], pillars = [] } = aboutData;
  const [activePrinciple, setActivePrinciple] = useState(0);

  return (
    <section className="section-padding">
      <div className="container-wide">
        
        {/* Operating Principles Header */}
        <div className="section-header">
          <span className="section-label font-mono">OPERATING PRINCIPLES</span>
          <h2 className="section-title">How We Build & Work</h2>
        </div>

        {/* Interactive Principles Scanner (Console + Spec Pane) */}
        <div className="principles-scanner-grid">
          <div className="principles-selector-list">
            {values.map((val, idx) => {
              const isActive = activePrinciple === idx;

              return (
                <motion.div
                  key={idx}
                  className={`principle-selector-item ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setActivePrinciple(idx)}
                  onClick={() => setActivePrinciple(idx)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="selector-index font-mono">{val.num}</span>
                  <div className="selector-text">
                    <h3 className="selector-title">{val.title}</h3>
                  </div>
                  <div className="selector-indicator" />
                </motion.div>
              );
            })}
          </div>

          <div className="principles-display-pane">
            <div className="pane-glass-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePrinciple}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="pane-content"
                >
                  <span className="pane-num font-mono">{values[activePrinciple]?.num} SPECIFICATION</span>
                  <h3 className="pane-heading">{values[activePrinciple]?.title}</h3>
                  <p className="pane-desc">{values[activePrinciple]?.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Core Initiatives Header */}
        <div className="section-header margin-top-xl">
          <span className="section-label font-mono">DEPARTMENTAL PILLARS</span>
          <h2 className="section-title">Core Initiatives</h2>
        </div>

        {/* Multi-Dimensional Spotlight Grid */}
        <div className="initiatives-spotlight-grid">
          {pillars.map((pillar, pIdx) => (
            <motion.div
              key={pIdx}
              className="initiative-spotlight-card"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-ambient-light" />
              <div className="card-top-line" />
              <span className="initiative-index font-mono">INITIATIVE 0{pIdx + 1}</span>
              <h3 className="initiative-title">{pillar.label}</h3>
              <p className="initiative-desc">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aboutData } from '../../data/aboutData';
import './Timeline.css';

export default function Timeline() {
  const { timeline = [] } = aboutData;
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section-padding">
      <div className="container-wide">
        
        <div className="section-header">
          <span className="section-label font-mono">CHRONOLOGICAL PROGRESSION</span>
          <h2 className="section-title">The ITSA Journey</h2>
        </div>

        {/* Interactive Progress Stepper */}
        <div className="stepper-navigation-bar">
          <div className="stepper-track-line" />

          <div className="stepper-buttons-row">
            {timeline.map((item, idx) => {
              const isActive = activeStep === idx;
              const isPassed = activeStep > idx;

              return (
                <button
                  key={idx}
                  className={`stepper-node-btn ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="node-ring">
                    <span className="node-core" />
                  </div>
                  <div className="node-label-box">
                    <span className="node-phase font-mono">{item.phase}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Focus Spec Showcase Pane */}
        <div className="stepper-showcase-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="showcase-content"
            >
              <div className="showcase-top-meta font-mono">
                <span>MILESTONE PHASE 0{activeStep + 1}</span>
                <span className="meta-tag">{timeline[activeStep]?.phase}</span>
              </div>

              <h3 className="showcase-title">{timeline[activeStep]?.title}</h3>
              <p className="showcase-detail">{timeline[activeStep]?.detail}</p>
              
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
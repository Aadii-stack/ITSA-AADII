"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, ShieldCheck } from "lucide-react";
import { aboutData } from "../../data/aboutData";
import "../about/Timeline.css";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function Feature24MilestoneTimeline() {
  const { timeline = [] } = aboutData;

  return (
    <section className="ft24-timeline-section" aria-labelledby="timeline-heading">
      <div className="ft24-ambient-glow" />

      <div className="container-wide">
        {/* Section Header */}
        <div className="section-intro">
          <div className="circuit-label font-mono">
            <span className="circuit-dot"></span>
            04 /// CHRONOLOGICAL PROGRESSION
          </div>
          <h2 id="timeline-heading" className="section-title">
            The ITSA Journey
          </h2>
          <p className="section-subtitle">
            Exploring departmental evolution, landmark conventions, and technical milestones at SLRTCE.
          </p>
        </div>

        {/* Animated Milestones Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="ft24-timeline-wrapper"
        >
          {/* Vertical Center Line */}
          <div className="ft24-vertical-line" />

          {timeline.map((mil, idx) => {
            const isRight = idx % 2 === 1;

            return (
              <motion.div 
                key={idx} 
                variants={popIn} 
                className={`ft24-milestone-row ${isRight ? 'is-right' : 'is-left'}`}
              >
                {/* Node Dot */}
                <div className="ft24-node-dot">
                  <div className="ft24-dot-core" />
                </div>

                {/* Exactly ONE Card Column per row */}
                <div className="ft24-card-column">
                  <div className="ft24-card-box">
                    <div className="ft24-card-header font-mono">
                      <Terminal size={13} />
                      <span>// {mil.phase}</span>
                    </div>
                    <h3 className="ft24-card-title">{mil.title}</h3>
                    <p className="ft24-card-desc">{mil.detail}</p>
                    <div className="ft24-card-footer font-mono">
                      <span>RECORD // 0{idx + 1}</span>
                      <span className="ft24-verified-tag">
                        <ShieldCheck size={11} /> VERIFIED
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
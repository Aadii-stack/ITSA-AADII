import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../data/siteConfig';
import { aboutData } from '../../data/aboutData';
import './AboutHero.css';

export default function AboutHero() {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      label: "Mission & Purpose",
      title: "Bridging Theory & Practice",
      desc: aboutData.mission,
    },
    {
      label: "Operating Philosophy",
      title: "Action Over Theory",
      desc: "We prioritize labs, hackathons, open-source projects, and peer mentorship over passive learning. Every initiative is conceptualized and built by students.",
    },
    {
      label: "Departmental Identity",
      title: aboutData.tagline,
      desc: `Constituted under the ${siteConfig.department} at ${siteConfig.institutionShort} to provide a student-led ecosystem for continuous technical growth.`,
    },
  ];

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="container-wide">
        <div className="hero-header-badge font-mono">
          <span>{siteConfig.department}</span>
          <span className="badge-sep">•</span>
          <span>{siteConfig.institutionShort}</span>
        </div>

        <div className="hero-grid">
          <div className="hero-main-content">
            <h1 id="hero-title" className="hero-title">
              Engineered by Students. <br />
              <span className="title-accent">Empowering Technical Growth.</span>
            </h1>

            <p className="hero-lead">
              The official student association providing a collaborative ecosystem for software engineering, peer learning, and hands-on technical innovation.
            </p>
          </div>

          <div className="hero-interactive-card">
            <div className="hero-card-tabs">
              {pillars.map((item, idx) => (
                <button
                  key={idx}
                  className={`hero-tab-btn ${activeTab === idx ? 'active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="hero-card-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="hero-card-heading">{pillars[activeTab].title}</h3>
                  <p className="hero-card-desc">"{pillars[activeTab].desc}"</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
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
    <section className="about-hero-section" aria-labelledby="about-hero-title">
      <div className="container-wide">
        <div className="about-hero-grid">
          <div className="about-hero-main-content">
            <h1 id="about-hero-title" className="about-hero-title">
              Engineered by Students. <br />
              <span className="about-title-accent">Empowering Technical Growth.</span>
            </h1>

            <p className="about-hero-lead">
              The official student association providing a collaborative ecosystem for software engineering, peer learning, and hands-on technical innovation at SLRTCE.
            </p>
          </div>

          <div className="about-hero-interactive-card">
            <div className="about-hero-card-tabs">
              {pillars.map((item, idx) => (
                <button
                  key={idx}
                  className={`about-hero-tab-btn ${activeTab === idx ? 'active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="about-hero-card-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="about-card-heading">{pillars[activeTab].title}</h3>
                  <p className="about-card-desc">"{pillars[activeTab].desc}"</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

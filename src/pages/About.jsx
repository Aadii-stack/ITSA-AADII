import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import AboutHero from '../components/about/AboutHero';
import MissionValues from '../components/about/MissionValues';
import Timeline from '../components/about/Timeline';
import BatchArchive from '../components/about/BatchArchive';
import { ArrowRight, Calendar, Award } from 'lucide-react';
import './About.css';

export default function About() {
  useEffect(() => {
    document.title = 'About ITSA — Vision, Charter & Legacy | SLRTCE';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page-view">
      {/* Background Ambient Circuit Grid */}
      <div className="about-ambient-grid" aria-hidden="true" />

      {/* 1. Hero Charter Section */}
      <AboutHero />

      {/* 2. Core Mission & Operating Principles */}
      <MissionValues />

      {/* 3. Interactive Milestones Progression */}
      <Timeline />

      {/* 4. Historical Student Council Archive (2021 - Present) */}
      <BatchArchive />

      {/* 5. Bottom Navigation Banner */}
      <section className="about-bottom-cta-section" aria-label="Explore more of ITSA">
        <div className="container-wide">
          <div className="about-cta-card">
            <div className="cta-ambient-glow" />
            
            <div className="cta-card-left">
              <div className="circuit-tag font-mono">
                <span className="circuit-box">NEXT</span>
                <span>SYSTEM NAVIGATION</span>
              </div>
              <h2 className="about-cta-title">
                Experience ITSA in Action
              </h2>
              <p className="about-cta-sub">
                Browse our workshop archives or explore the dedicated portal for our flagship convention, Meta Summit.
              </p>
            </div>

            <div className="cta-card-buttons">
              <Link to={siteConfig.links.events} className="cta-btn cta-btn-secondary font-mono">
                <Calendar size={16} />
                <span>Events Archive</span>
              </Link>
              <Link to={siteConfig.links.metaSummit} className="cta-btn cta-btn-primary font-mono">
                <Award size={16} />
                <span>Meta Summit Portal</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
import React, { useEffect } from 'react';
import FacultyCommittee from '../components/home/FacultyCommittee';
import CoreCommittee from '../components/home/CoreCommittee';
import { Users, GraduationCap, Sparkles } from 'lucide-react';
import './Team.css';

export default function Team() {
  useEffect(() => {
    document.title = 'Leadership & Committee — ITSA | SLRTCE';
    window.scrollTo(0, 0);
  }, []);

  const handleScrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="team-page-view">
      {/* Background Ambient Grid */}
      <div className="team-ambient-grid" aria-hidden="true" />

      {/* Hero Header Section */}
      <section className="team-hero-header">
        <div className="container-wide">
          <h1 className="team-main-title">
            The Minds Guiding the Circuit
          </h1>

          <p className="team-main-subtitle">
            Distinguished faculty mentors and elected student council leadership working in synergy to empower technical excellence, peer collaboration, and student innovation at SLRTCE.
          </p>

          <div className="team-quick-jumps">
            <a href="#faculty" onClick={handleScrollTo('faculty')} className="team-jump-chip">
              <GraduationCap size={16} />
              <span>Faculty Leadership</span>
            </a>
            <a href="#team" onClick={handleScrollTo('team')} className="team-jump-chip active">
              <Users size={16} />
              <span>Core Student Committee</span>
            </a>
          </div>
        </div>
      </section>

      {/* 1. Faculty Leadership Section */}
      <div id="faculty">
        <FacultyCommittee />
      </div>

      {/* 2. Core Student Committee Section */}
      <div id="team">
        <CoreCommittee />
      </div>
    </div>
  );
}

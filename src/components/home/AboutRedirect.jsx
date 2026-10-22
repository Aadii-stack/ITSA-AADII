import React from 'react';
import { Link } from 'react-router-dom';
import './AboutRedirect.css';

const AboutRedirect = () => {
  return (
    <section id="about" className="about-redirect-section">
      <div className="about-redirect-card">
        <div className="about-redirect-text">
          <span className="gold-sub">DEPARTMENT OF INFORMATION TECHNOLOGY • SLRTCE</span>
          <h2>THE COMMUNITY BEHIND THE CODE</h2>
          <p>
            ITSA unites student engineers, mentors, and creators across all academic years to organize hands-on technical workshops, competitive hackathons, and collaborative campus initiatives.
          </p>
        </div>
        <Link 
          to="/team" 
          className="about-cta-btn"
          aria-label="Discover faculty advisors and student committee leadership"
        >
          VIEW LEADERSHIP & ADVISORS <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default AboutRedirect;

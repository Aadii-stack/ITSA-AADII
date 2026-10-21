import React from 'react';
import './AboutRedirect.css';

const AboutRedirect = () => {
  const handleScrollToTeam = (e) => {
    e.preventDefault();
    const target = document.querySelector('#faculty');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <a 
          href="#faculty" 
          className="about-cta-btn"
          onClick={handleScrollToTeam}
          aria-label="Discover faculty advisors and student committee leadership"
        >
          VIEW LEADERSHIP & ADVISORS <span className="arrow" aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
};

export default AboutRedirect;

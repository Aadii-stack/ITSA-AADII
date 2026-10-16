import React from 'react';
import './AboutRedirect.css';

const AboutRedirect = () => {
  return (
    <section className="about-redirect-section">
      <div className="about-redirect-card">
        <div className="about-redirect-text">
          <span className="gold-sub">GET TO KNOW US BETTER</span>
          <h2>WANT TO LEARN MORE ABOUT ITSA?</h2>
          <p>
            Discover our mission, history, faculty advisors, and full organizational structure on our dedicated About page.
          </p>
        </div>
        <a href="/about" className="about-cta-btn">
          GO TO ABOUT PAGE <span className="arrow">↗</span>
        </a>
      </div>
    </section>
  );
};

export default AboutRedirect;
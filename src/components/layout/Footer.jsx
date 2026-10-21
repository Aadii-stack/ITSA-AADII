import React from 'react';
import { siteConfig } from '../../data/siteConfig';
import { ArrowUpRight, MapPin, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Circuit accent border on top */}
      <div className="footer-top-rule">
        <span className="footer-circuit-node left"></span>
        <div className="footer-rule-line"></div>
        <span className="footer-circuit-node right"></span>
      </div>

      <div className="container-wide footer-content">
        <div className="footer-grid">
          {/* Col 1: Brand & Tagline */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <img 
                src={siteConfig.logo} 
                alt="ITSA SLRTCE Logo" 
                className="footer-logo-img" 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <h3 className="footer-brand-title">{siteConfig.name}</h3>
                <p className="footer-brand-subtitle">{siteConfig.fullName}</p>
              </div>
            </div>

            <div className="footer-tagline-box">
              <span className="footer-tagline-motto">{siteConfig.tagline}</span>
              <p className="footer-tagline-desc">
                Connecting student developers, technical exploration, and collective creativity within SLRTCE.
              </p>
            </div>

            <div className="footer-college-tag">
              <span className="circuit-dot"></span>
              <span>{siteConfig.department}</span>
            </div>
            <p className="footer-institution">{siteConfig.institution}</p>
          </div>

          {/* Col 2: Focus Areas */}
          <div className="footer-pillars-col">
            <span className="footer-col-label">The ITSA Circuit</span>
            <ul className="footer-pillars-list">
              <li>Hands-on Technical Workshops</li>
              <li>Departmental Competitive Sprints</li>
              <li>Meta Summit Annual Convention</li>
              <li>Peer Mentorship & Capstone Labs</li>
              <li>Student Open-Source Culture</li>
            </ul>
          </div>

          {/* Col 3: Campus & Connectivity */}
          <div className="footer-contact-col">
            <span className="footer-col-label">Official Touchpoints</span>
            <div className="footer-contact-item">
              <MapPin size={16} className="footer-icon" />
              <span>{siteConfig.location}</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} className="footer-icon" />
              <span>{siteConfig.contact.email}</span>
            </div>

            <div className="footer-socials-group">
              <span className="footer-sublabel">Official Socials</span>
              <div className="footer-social-chips">
                {siteConfig.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-chip"
                    aria-label={`ITSA on ${social.name}`}
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <p className="copyright-text">
              © {currentYear} Information Technology Student Association (ITSA), SLRTCE.
            </p>
            <p className="affiliation-subtext">
              Constituent student association under Shree L. R. Tiwari College of Engineering.
            </p>
          </div>
          <div className="footer-bottom-right">
            <span className="circuit-status-chip">
              <span className="circuit-pulse-dot"></span>
              <span>The ITSA Circuit • Active</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

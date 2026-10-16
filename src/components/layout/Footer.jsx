import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { ArrowUpRight, MapPin, Mail, Sparkles } from 'lucide-react';
import { WebCorner } from '../meta/MetaDecor';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();

  // Meta Summit ships its own footer theme; every other route keeps Footer.css as-is.
  const isMetaSummit = pathname === siteConfig.links.metaSummit;
  const footerRef = useRef(null);
  const [metaRevealed, setMetaRevealed] = useState(false);

  useEffect(() => {
    if (!isMetaSummit) return undefined;

    setMetaRevealed(false);
    const el = footerRef.current;

    if (!el || typeof IntersectionObserver === 'undefined') {
      setMetaRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setMetaRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMetaSummit]);

  const footerClasses = ['site-footer'];
  if (isMetaSummit) {
    footerClasses.push('meta-footer');
    if (metaRevealed) footerClasses.push('meta-footer-revealed');
  }

  return (
    <footer ref={footerRef} className={footerClasses.join(' ')}>
      {isMetaSummit && (
        <>
          <WebCorner className="meta-footer-web meta-footer-web-tr" />
          <WebCorner className="meta-footer-web meta-footer-web-bl" orientation="bl" />
        </>
      )}

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

          {/* Col 2: Navigation */}
          <div className="footer-links-col">
            <span className="footer-col-label">Navigation</span>
            <ul className="footer-links-list">
              <li>
                <Link to={siteConfig.links.home} className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to={siteConfig.links.about} className="footer-link">
                  About ITSA & Mission
                </Link>
              </li>
              <li>
                <Link to={siteConfig.links.events} className="footer-link">
                  Events Archive
                </Link>
              </li>
              <li>
                <Link to={siteConfig.links.metaSummit} className="footer-link footer-flagship-link">
                  Meta Summit <span className="flagship-mini-badge">Flagship</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Focus Areas */}
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

          {/* Col 4: Campus & Connectivity */}
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

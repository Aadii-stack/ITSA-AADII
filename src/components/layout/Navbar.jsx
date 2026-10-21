import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logoImg from '../../assets/itsa-logo.png';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '#' },
    { label: 'About', path: '#about' },
    { label: 'Events', path: '#events' },
    { label: 'Faculty', path: '#faculty' },
    { label: 'Team', path: '#team' },
  ];

  return (
    <>
      <header className="navbar-wrap">
        <nav className="navbar" aria-label="Main navigation">
          {/* Brand Logo & Title on Left */}
          <a href="#" className="brand" aria-label="ITSA Home">
            <span className="brand-logo" aria-hidden="true">
              <img 
                src={logoImg} 
                alt="ITSA Logo" 
                className="brand-logo-img"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </span>
            ITSA
          </a>

          {/* Nav Links */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>

          {/* Action / Connect button */}
          <a href="#team" className="btn-download">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="btn-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            Connect
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="navbar-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-inner">
          <div className="drawer-header">
            <span className="circuit-tag">• NAVIGATION CIRCUIT</span>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <ul className="drawer-links-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.path}
                  className="drawer-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

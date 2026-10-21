import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logoImg from '../../assets/itsa-logo.png';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hamburgerBtnRef = useRef(null);
  const drawerRef = useRef(null);

  const navLinks = [
    { label: 'Home', path: '#' },
    { label: 'About', path: '#about' },
    { label: 'Events', path: '#events' },
    { label: 'Faculty', path: '#faculty' },
    { label: 'Team', path: '#team' },
  ];

  // Mobile drawer keyboard and focus management
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    // Lock background scroll
    document.body.style.overflow = 'hidden';

    // Focus the first interactive element inside the drawer
    const focusableElements = drawerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    firstElement?.focus();

    const handleKeyDown = (e) => {
      // Escape to close
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileMenuOpen(false);
        hamburgerBtnRef.current?.focus();
        return;
      }

      // Tab trapping
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    hamburgerBtnRef.current?.focus();
  };

  return (
    <>
      <header className="navbar-wrap">
        <nav className="navbar" aria-label="Main navigation">
          {/* Brand Logo & Title on Left */}
          <a href="#" className="brand" aria-label="ITSA Home">
            <img 
              src={logoImg} 
              alt="ITSA Logo" 
              className="brand-logo-img"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
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
          <a href="#team" className="btn-download" aria-label="Connect with ITSA team">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="btn-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            Connect
          </a>

          {/* Mobile Hamburger Button */}
          <button
            ref={hamburgerBtnRef}
            type="button"
            className="navbar-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-haspopup="dialog"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div 
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMobileMenu();
        }}
      >
        <div 
          ref={drawerRef}
          className="mobile-drawer-inner"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="drawer-header">
            <span className="circuit-tag">• NAVIGATION CIRCUIT</span>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
            >
              <X size={22} />
            </button>
          </div>

          <ul className="drawer-links-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.path}
                  className="drawer-link"
                  onClick={closeMobileMenu}
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

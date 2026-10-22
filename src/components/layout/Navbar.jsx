import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logoImg from '../../assets/itsa-logo.png';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hamburgerBtnRef = useRef(null);
  const drawerRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { label: 'About', path: '/about', isHash: false },
    { label: 'Events', path: '/events', isHash: false },
    { label: 'Team', path: '/team', isHash: false },
    { label: 'Meta Summit', path: '/meta-summit', isHash: false },
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

  const handleHashClick = (e, hashId) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(hashId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="navbar-wrap">
        <nav className="navbar" aria-label="Main navigation">
          {/* Brand Logo & Title on Left */}
          <Link to="/" className="brand" aria-label="ITSA Home">
            <img 
              src={logoImg} 
              alt="ITSA Logo" 
              className="brand-logo-img"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            ITSA
          </Link>

          {/* Nav Links */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.isHash ? (
                  <Link 
                    to={link.path}
                    onClick={(e) => handleHashClick(e, link.hashId)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <NavLink 
                    to={link.path}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    end={link.path === '/'}
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

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
                {link.isHash ? (
                  <Link
                    to={link.path}
                    className="drawer-link"
                    onClick={(e) => {
                      handleHashClick(e, link.hashId);
                      closeMobileMenu();
                    }}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={18} />
                  </Link>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                    end={link.path === '/'}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={18} />
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

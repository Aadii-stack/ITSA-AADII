import React, { useState, useEffect } from 'react';
import { siteConfig } from '../../data/siteConfig';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logoImg from '../../assets/itsa-logo.png';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '#' },
    { label: 'Team', path: '#faculty' },
  ];

  return (
    <>
      <header className={`floating-nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div 
          className={`nav-pill-container ${isHovered ? 'expanded' : 'collapsed'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Brand Logo */}
          <a href="#" className="pill-logo-btn" aria-label="ITSA Home">
            <img 
              src={logoImg} 
              alt="ITSA Logo" 
              className="pill-logo-img"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="pill-brand-text">ITSA</span>
          </a>

          {/* Navigation Links */}
          <nav className="pill-nav-menu">
            <ul className="pill-nav-list">
              {navLinks.map((link) => (
                <li key={link.path} className="pill-nav-item">
                  <a href={link.path} className="pill-nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Top Navbar Header */}
        <div className="mobile-nav-bar">
          <a href="#" className="mobile-brand-link">
            <img src={logoImg} alt="ITSA Logo" className="mobile-logo-img" />
            <span className="mobile-brand-title">ITSA SLRTCE</span>
          </a>
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-inner">
          <div className="drawer-header">
            <span className="circuit-tag">• NAVIGATION CIRCUIT</span>
            <button className="drawer-close-btn" onClick={() => setMobileMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <ul className="drawer-links-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <a href={link.path} className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
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
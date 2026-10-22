import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logoImg from '../../assets/itsa-logo.png';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
  { label: 'Home', path: siteConfig.links.home },
  { label: 'Team', path: '/#faculty' }, // Navigates & scrolls directly to Faculty section
  { label: 'About', path: siteConfig.links.about },
  { label: 'Events', path: siteConfig.links.events },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Meta Summit', path: siteConfig.links.metaSummit, isFlagship: true },
];

  return (
    <>
      <header className={`floating-nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div 
          className={`nav-pill-container ${isHovered ? 'expanded' : 'collapsed'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Larger Brand Logo */}
          <Link to="/" className="pill-logo-btn" aria-label="ITSA Home">
            <img 
              src={logoImg} 
              alt="ITSA Logo" 
              className="pill-logo-img"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="pill-brand-text">ITSA</span>
          </Link>

          {/* Navigation Links */}
          <nav className="pill-nav-menu">
            <ul className="pill-nav-list">
              {navLinks.map((link) => (
                <li key={link.path} className="pill-nav-item">
                  {link.path.startsWith('/#') ? (
                    <a href={link.path} className="pill-nav-link">
                      {link.label}
                    </a>
                  ) : (
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) =>
                        `pill-nav-link ${isActive ? 'active' : ''} ${link.isFlagship ? 'flagship' : ''}`
                      }
                    >
                      {link.label}
                      {link.isFlagship && <span className="pill-flagship-tag">VIP</span>}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Top Navbar Header */}
        <div className="mobile-nav-bar">
          <Link to="/" className="mobile-brand-link">
            <img src={logoImg} alt="ITSA Logo" className="mobile-logo-img" />
            <span className="mobile-brand-title">ITSA SLRTCE</span>
          </Link>
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
                {link.path.startsWith('/#') ? (
                  <a href={link.path} className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                    <span>{link.label}</span>
                    <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
                  >
                    <span>{link.label}</span>
                    {link.isFlagship ? (
                      <span className="pill-flagship-tag">FLAGSHIP</span>
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
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
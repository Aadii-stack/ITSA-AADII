import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Node Not Found | ITSA';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="not-found-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem 4rem 1.5rem' }}>
      <div className="container-narrow text-center" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div 
          className="circuit-label font-mono" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.3rem 0.8rem', 
            background: 'var(--color-lavender-dim)', 
            border: '1px solid var(--color-lavender-border)', 
            borderRadius: 'var(--radius-pill)',
            color: 'var(--color-lavender)',
            fontSize: '0.78rem',
            marginBottom: '1.25rem'
          }}
        >
          <span className="circuit-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-lavender)' }}></span>
          <span>ERROR 404 // CIRCUIT OPEN</span>
        </div>
        
        <h1 
          className="display-title" 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(2.5rem, 6vw, 3.8rem)', 
            fontWeight: 800, 
            color: 'var(--color-warm-white)', 
            margin: '0.5rem 0 1rem 0' 
          }}
        >
          Node Not Found
        </h1>

        <p 
          className="section-subtitle" 
          style={{ 
            fontSize: '1rem', 
            color: 'var(--color-text-secondary)', 
            marginBottom: '2rem', 
            lineHeight: 1.6 
          }}
        >
          The requested coordinate does not exist in the ITSA network topology. The route may have been decommissioned or relocated.
        </p>

        <Link 
          to={siteConfig.links.home} 
          className="cta-btn cta-btn-primary font-mono" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.8rem 1.4rem', 
            background: 'var(--color-lavender)', 
            color: '#08070b', 
            borderRadius: 'var(--radius-xs)', 
            fontWeight: 700, 
            textDecoration: 'none' 
          }}
        >
          <ArrowLeft size={16} />
          <span>Return to Central Hub</span>
        </Link>
      </div>
    </div>
  );
}

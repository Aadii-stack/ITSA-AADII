import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="not-found-page section-py">
      <div className="container-narrow text-center" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
        <div className="circuit-label" style={{ justifyContent: 'center' }}>
          <span className="circuit-dot"></span>
          Error 404 // Circuit Open
        </div>
        <h1 className="display-title" style={{ fontSize: '3rem', margin: '1rem 0' }}>
          Node Not Found
        </h1>
        <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
          The requested coordinate does not exist in the ITSA network topology.
        </p>
        <Link to={siteConfig.links.home} className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}

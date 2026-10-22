import React, { useEffect } from 'react';
import DomeGallery from '../components/gallery/DomeGallery';
import './Gallery.css';

export default function Gallery() {
  useEffect(() => {
    document.title = 'Visual Archive & 3D Dome Gallery — ITSA | SLRTCE';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gallery-page-view">
      <div className="gallery-header-strip">
        <div className="container-wide">
          <div className="gallery-top-badge font-mono">
            <span className="circuit-dot"></span>
            <span>3D SPATIAL DOME // VISUAL ARCHIVE</span>
          </div>
          <h1 className="gallery-main-title">
            Departmental Moments in Motion
          </h1>
          <p className="gallery-main-subtitle">
            Hover over the sphere to pause rotation. Click any card to inspect high-resolution workshop & hackathon archives.
          </p>
        </div>
      </div>

      <div className="gallery-stage-container">
        <DomeGallery fit={0.68} />
      </div>
    </div>
  );
}

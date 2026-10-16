import React, { useState } from 'react';
import './DomeGallery.css';

import bannerImg from '../../assets/slrtce-banner.png';
import heroImg from '../../assets/hero.png';
import logoImg from '../../assets/slrtce-logo.png';

const initialItems = [
  { id: 'img-1', src: bannerImg, alt: 'GameForge Hackathon' },
  { id: 'img-2', src: heroImg, alt: 'AI Fusion Summit' },
  { id: 'img-3', src: logoImg, alt: 'SLRTCE Campus' },
  { id: 'img-4', src: bannerImg, alt: 'CodeCraft Workshop' },
  { id: 'img-5', src: heroImg, alt: 'Meta Summit Keynote' },
  { id: 'img-6', src: logoImg, alt: 'ITSA Team' },
];

const DomeGallery = ({ items = initialItems, fit = 0.65 }) => {
  const [activeImage, setActiveImage] = useState(null);

  const baseItems = items.length > 0 ? items : initialItems;

  // Auto-duplicate items to reach at least 24 elements for a dense dome structure
  const targetCount = 24;
  const fullList = Array.from({ length: targetCount }, (_, i) => {
    const original = baseItems[i % baseItems.length];
    return {
      ...original,
      domeUniqueId: `dome-${i}-${original.id || 'item'}`,
    };
  });

  return (
    <div className="dome-gallery-container" style={{ transform: `scale(${fit})` }}>
      <div className="dome-stage">
        <div className="dome-sphere">
          {fullList.map((item, index) => {
            const total = fullList.length;
            
            // Golden ratio sphere distribution algorithm
            const phi = Math.acos(-1 + (2 * index + 1) / total);
            const theta = Math.sqrt(total * Math.PI) * phi;

            const radius = 340; // Dome radius
            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            // Orient cards toward sphere center
            const rotY = (theta * 180) / Math.PI;
            const rotX = (phi * 180) / Math.PI - 90;

            return (
              <div
                key={item.domeUniqueId}
                className="dome-card-item"
                style={{
                  transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
                }}
                onClick={() => setActiveImage(item)}
              >
                <img src={item.src} alt={item.alt || 'Gallery item'} className="dome-card-img" />
                <div className="dome-card-glow" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Preview */}
      {activeImage && (
        <div className="dome-lightbox" onClick={() => setActiveImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setActiveImage(null)}>✕</button>
            <img src={activeImage.src} alt={activeImage.alt} />
            <p className="lightbox-caption">{activeImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomeGallery;
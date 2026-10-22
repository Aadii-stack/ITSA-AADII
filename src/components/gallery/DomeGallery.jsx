import React, { useState } from 'react';
import './DomeGallery.css';

import gameforgeCover from '../../assets/events/gameforge/gameforge-cover.jpg';
import aiFusionCover from '../../assets/events/ai-fusion/ai-fusion-cover.jpg';
import cbpSyCover from '../../assets/events/cbp-sy/cbp-sy-cover.jpg';
import cbpTyCover from '../../assets/events/cbp-ty/cbp-ty-cover.jpg';
import hackathonsImg from '../../assets/initiatives/hackathons.jpeg';
import technicalImg from '../../assets/initiatives/technical.jpeg';
import innovationImg from '../../assets/initiatives/innovation.jpeg';
import bannerImg from '../../assets/slrtce-banner.png';

const defaultGalleryItems = [
  { id: 'img-1', src: gameforgeCover, alt: 'GameForge Game Development Hackathon' },
  { id: 'img-2', src: aiFusionCover, alt: 'AI Fusion Hands-on Summit' },
  { id: 'img-3', src: cbpSyCover, alt: 'Community Based Project Lab - SE' },
  { id: 'img-4', src: cbpTyCover, alt: 'Departmental Technical Convention - TE' },
  { id: 'img-5', src: hackathonsImg, alt: 'Department Hackathon & Sprints' },
  { id: 'img-6', src: technicalImg, alt: 'Cloud & System Engineering Labs' },
  { id: 'img-7', src: innovationImg, alt: 'Student Innovation & Project Pitches' },
  { id: 'img-8', src: bannerImg, alt: 'SLRTCE Campus Community' },
];

export default function DomeGallery({ items = defaultGalleryItems, fit = 0.68 }) {
  const [activeImage, setActiveImage] = useState(null);

  const baseItems = items.length > 0 ? items : defaultGalleryItems;

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
}

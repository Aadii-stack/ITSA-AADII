import React from 'react';
import DomeGallery from '../components/gallery/DomeGallery';

export default function Gallery() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#080808' }}>
      <DomeGallery fit={0.65} />
    </div>
  );
}
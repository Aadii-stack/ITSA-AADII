import React, { useState, useEffect } from 'react';
import MetaHero from '../components/meta/MetaHero';
import MetaOverview from '../components/meta/MetaOverview';
import MetaMemories from '../components/meta/MetaMemories';
import MetaInterestModal from '../components/meta/MetaInterestModal';
import '../components/meta/metaTheme.css';
import '../components/meta/MetaFooter.css';

export default function MetaSummit() {
  const [interestModalOpen, setInterestModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Meta Summit — ITSA Flagship Annual Convention | SLRTCE';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="meta-summit-page-view">
      {/* Flagship Hero */}
      <MetaHero onOpenInterestModal={() => setInterestModalOpen(true)} />

      {/* Overview & Poster Slot */}
      <MetaOverview />

      {/* Meta Summit 2025 — Memories */}
      <MetaMemories />

      {/* Interactive Priority Notification Modal */}
      <MetaInterestModal
        isOpen={interestModalOpen}
        onClose={() => setInterestModalOpen(false)}
      />
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aboutData } from '../../data/aboutData';
import './BatchArchive.css';

export default function BatchArchive() {
  const { batchArchiveData = [] } = aboutData;
  const [selectedBatchIndex, setSelectedBatchIndex] = useState(0);

  const currentBatch = batchArchiveData[selectedBatchIndex] || batchArchiveData[0];

  return (
    <section className="section-padding">
      <div className="container-wide">
        
        <div className="section-header">
          <span className="section-label font-mono">ARCHIVAL RECORDS</span>
          <h2 className="section-title">Past & Present Student Committees</h2>
          <p className="section-sub">
            Executive leadership teams driving ITSA operations at SLRTCE.
          </p>
        </div>

        {/* Year Filter Buttons */}
        <div className="roster-year-bar">
          {batchArchiveData.map((batch, idx) => (
            <button
              key={batch.year}
              className={`year-filter-btn ${selectedBatchIndex === idx ? 'active' : ''}`}
              onClick={() => setSelectedBatchIndex(idx)}
            >
              <span className="year-title font-mono">{batch.year}</span>
              <span className="year-label">{batch.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive Member Roster Display */}
        <div className="roster-board">
          <div className="board-top-bar font-mono">
            <span>COMMITTEE ROSTER ({currentBatch.year})</span>
            <span>{currentBatch.members.length} MEMBERS</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBatchIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="board-members-grid"
            >
              {currentBatch.members.map((member, mIdx) => (
                <div key={mIdx} className="board-member-card">
                  <span className="member-position font-mono">{member.position}</span>
                  <h4 className="member-fullname">{member.name}</h4>
                  <span className="member-department">{member.department}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
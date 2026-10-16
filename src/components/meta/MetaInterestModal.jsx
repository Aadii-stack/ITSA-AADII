import React, { useState, useEffect } from 'react';
import { X, Bell, CheckCircle2, Send } from 'lucide-react';
import './MetaInterestModal.css';

export default function MetaInterestModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [studentYear, setStudentYear] = useState('FE');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="interest-modal-backdrop" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="interest-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="modal-success-state">
            <div className="success-icon-box">
              <CheckCircle2 size={40} className="success-icon" />
            </div>
            <h3 className="success-title">Interest Expressed!</h3>
            <p className="success-desc">
              Thank you for expressing interest in <strong>Meta Summit</strong>. We have saved your 
              notification preference for <em>{email}</em>. As soon as the official timetable and registration 
              portal are approved by the Department, you will receive priority alerts.
            </p>
            <button type="button" className="btn btn-primary" onClick={handleClose}>
              Back to Meta Summit
            </button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-header">
              <div className="circuit-badge">
                <Bell size={12} />
                <span>PRIORITY NOTIFICATION DESK</span>
              </div>
              <h3 className="modal-title">Get Notified for Meta Summit</h3>
              <p className="modal-subtitle">
                Official registrations open alongside the approved event poster and itinerary. Leave your details below.
              </p>
            </div>

            <div className="form-field">
              <label htmlFor="student-email" className="field-label font-mono">
                Student Email (College or Personal)
              </label>
              <input
                id="student-email"
                type="email"
                required
                placeholder="e.g. yourname@student.slrtce.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input font-mono"
              />
            </div>

            <div className="form-field">
              <label htmlFor="academic-year" className="field-label font-mono">
                Academic Year / Batch
              </label>
              <select
                id="academic-year"
                value={studentYear}
                onChange={(e) => setStudentYear(e.target.value)}
                className="form-select font-mono"
              >
                <option value="FE">First Year (FE)</option>
                <option value="SE">Second Year (SE)</option>
                <option value="TE">Third Year (TE)</option>
                <option value="BE">Final Year (BE)</option>
                <option value="Other">Faculty / External Participant</option>
              </select>
            </div>

            <div className="modal-actions">
              <button type="submit" className="btn btn-primary btn-lg submit-notify-btn">
                <span>Confirm Notification Alert</span>
                <Send size={16} />
              </button>
              <p className="privacy-hint font-mono">
                No spam. Only verified ITSA & SLRTCE Meta Summit announcements.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { CalendarClock, Bell, Sparkles, MessageSquare } from 'lucide-react';
import './EmptyUpcomingState.css';

export default function EmptyUpcomingState() {
  return (
    <div className="empty-upcoming-box" role="status">
      <div className="empty-icon-wrapper">
        <CalendarClock size={32} className="empty-clock-icon" />
      </div>

      <div className="empty-text-group">
        <span className="empty-status-pill font-mono">STATUS: NO ACTIVE REGISTRATIONS</span>
        <h3 className="empty-heading">No Upcoming Events Currently Scheduled</h3>
        <p className="empty-subtext">
          Session schedules for the current academic session are being finalized by the ITSA working committee.
          Workshops, competition sprints, and guest lectures will be posted here as soon as approved by the Department.
        </p>
      </div>

      <div className="empty-action-strip font-mono">
        <span className="action-tag">
          <span className="circuit-dot"></span>
          Stay tuned via departmental announcements and official social channels
        </span>
      </div>
    </div>
  );
}

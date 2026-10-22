import React from 'react';
import { Calendar, MapPin, CheckCircle2, Clock, ExternalLink, ArrowRight, Tag } from 'lucide-react';
import './EventCard.css';

export default function EventCard({ event, isUpcoming = false }) {
  return (
    <article className={`event-archive-card ${isUpcoming ? 'upcoming' : 'past'}`}>
      {/* Circuit accent tag on top */}
      <div className="event-card-top-bar font-mono">
        <span className="event-category-chip">{event.category}</span>
        <span className={`event-status-indicator ${event.status.toLowerCase()}`}>
          {isUpcoming ? <Clock size={12} /> : <CheckCircle2 size={12} />}
          <span>{event.status}</span>
        </span>
      </div>

      <div className="event-card-body">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>

        {/* Highlights / takeaways */}
        {event.highlights && event.highlights.length > 0 && (
          <div className="event-highlights-list">
            {event.highlights.map((item, idx) => (
              <span key={idx} className="highlight-tag font-mono">
                • {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Meta info & Action */}
      <div className="event-card-footer">
        <div className="event-meta-items font-mono">
          <div className="meta-item">
            <Calendar size={14} className="meta-icon" />
            <span>{event.date}</span>
          </div>
          <div className="meta-item">
            <MapPin size={14} className="meta-icon" />
            <span>{event.venue}</span>
          </div>
        </div>

        {isUpcoming && event.registrationUrl && (
          <div className="event-action-wrap">
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <span>Register</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

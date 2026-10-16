import React from 'react';
import { Link } from 'react-router-dom';
import { featuredEvent } from '../../data/events';
import { siteConfig } from '../../data/siteConfig';
import { Calendar, MapPin, ArrowRight, BellRing, Sparkles } from 'lucide-react';
import './FeaturedEvent.css';

export default function FeaturedEvent() {
  // If an official upcoming event is configured, render its compact card
  if (featuredEvent) {
    return (
      <section className="featured-event-section section-py-sm" aria-labelledby="featured-event-title">
        <div className="container-wide">
          <div className="featured-event-card">
            <div className="featured-badge-row">
              <span className="circuit-badge">
                <span className="circuit-dot"></span>
                OFFICIAL UPCOMING EVENT
              </span>
              <span className="featured-cat-tag font-mono">{featuredEvent.category}</span>
            </div>

            <div className="featured-body">
              <h2 id="featured-event-title" className="featured-event-name">
                {featuredEvent.title}
              </h2>
              <p className="featured-event-desc">{featuredEvent.description}</p>

              <div className="featured-meta-row">
                <div className="meta-pill">
                  <Calendar size={15} className="meta-icon" />
                  <span>{featuredEvent.date}</span>
                </div>
                <div className="meta-pill">
                  <MapPin size={15} className="meta-icon" />
                  <span>{featuredEvent.venue}</span>
                </div>
              </div>
            </div>

            <div className="featured-action">
              {featuredEvent.registrationUrl ? (
                <a
                  href={featuredEvent.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>Register Now</span>
                  <ArrowRight size={16} />
                </a>
              ) : (
                <Link to={siteConfig.links.events} className="btn btn-secondary">
                  <span>View Event Details</span>
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Honest neutral fallback invitation when no confirmed event data is active
  return (
    <section className="featured-event-section section-py-sm" aria-label="Explore ITSA Events">
      <div className="container-wide">
        <div className="neutral-invitation-card">
          <div className="invitation-left">
            <div className="circuit-label">
              <span className="circuit-dot"></span>
              03 / What's Happening
            </div>
            <h2 className="invitation-title">
              Stay Connected with the ITSA Calendar
            </h2>
            <p className="invitation-subtitle">
              New workshops, departmental sprints, and session notices are scheduled through 
              the academic calendar. Explore past highlights and archive records.
            </p>
          </div>

          <div className="invitation-right">
            <Link to={siteConfig.links.events} className="btn btn-secondary invitation-btn">
              <span>Explore ITSA Events</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

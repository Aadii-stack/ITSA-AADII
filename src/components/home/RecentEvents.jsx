import React from 'react';
import './RecentEvents.css';
import bannerImg from '../../assets/slrtce-banner.png';
import heroImg from '../../assets/hero.png';

const recentEvents = [
  {
    id: '1',
    title: 'GameForge 2026 Hackathon',
    description: '24-hour game development sprint empowering developers to build next-gen interactive engines.',
    category: 'GameDev & AI',
    date: 'OCT 2026',
    image: bannerImg,
  },
  {
    id: '2',
    title: 'AI Fusion Summit',
    description: 'Deep dive into Generative AI architectures, LLM fine-tuning, and neural network deployments.',
    category: 'Innovation',
    date: 'SEP 2026',
    image: heroImg,
  },
  {
    id: '3',
    title: 'Cloud & Tech Talks',
    description: 'Interactive sessions with industry leaders on microservices and scalable cloud computing.',
    category: 'Industry Insights',
    date: 'AUG 2026',
    image: bannerImg,
  },
];

const RecentEvents = () => {
  return (
    <section className="recent-events-section">
      <div className="recent-events-container">
        {/* Section Header */}
        <div className="events-header">
          <h2>EVENTS</h2>
          <p className="events-subtext">A look back at our recent hackathons, technical summits, and expert workshops.</p>
        </div>

        {/* 3 Full Photo Cards (Matching Reference Layout) */}
        <div className="events-photo-grid">
          {recentEvents.map((event) => (
            <div key={event.id} className="photo-event-card">
              <img src={event.image} alt={event.title} className="card-bg-image" />
              <div className="card-dark-overlay" />

              <div className="card-bottom-info">
                <p className="card-quote">"{event.description}"</p>
                <div className="card-meta">
                  <span className="card-author">— {event.title}</span>
                  <span className="card-role">{event.category} • {event.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Events Redirection Button */}
        <div className="events-cta-wrapper">
          <a href="/events" className="explore-events-btn">
            EXPLORE MORE EVENTS <span className="arrow">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentEvents;
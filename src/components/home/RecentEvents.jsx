import React from 'react';
import './RecentEvents.css';
import bannerImg from '../../assets/slrtce-banner.png';
import gameforgeImg from '../../assets/events/gameforge/gameforge-cover.jpg';
import aiFusionImg from '../../assets/events/ai-fusion/ai-fusion-cover.jpg';

const recentEvents = [
  {
    id: '1',
    title: 'GameForge 2026 Hackathon',
    description: '24-hour game development sprint empowering developers to build next-gen interactive engines.',
    category: 'GameDev & AI',
    date: 'OCT 2026',
    image: gameforgeImg,
  },
  {
    id: '2',
    title: 'AI Fusion Summit',
    description: 'Deep dive into Generative AI architectures, LLM fine-tuning, and neural network deployments.',
    category: 'Innovation',
    date: 'SEP 2026',
    image: aiFusionImg,
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
  const handleScrollToSummit = (e) => {
    e.preventDefault();
    const target = document.querySelector('#meta-summit');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="events" className="recent-events-section">
      <div className="recent-events-container">
        {/* Section Header */}
        <div className="events-header">
          <h2>RECENT EVENTS</h2>
          <p className="events-subtext">A look back at our recent hackathons, technical summits, and expert workshops at SLRTCE.</p>
        </div>

        {/* 3 Full Photo Cards (Matching Reference Layout) */}
        <div className="events-photo-grid">
          {recentEvents.map((event) => (
            <div key={event.id} className="photo-event-card">
              <img src={event.image} alt={event.title} className="card-bg-image" loading="lazy" />
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

        {/* Explore More Events Anchor */}
        <div className="events-cta-wrapper">
          <a 
            href="#meta-summit" 
            className="explore-events-btn"
            onClick={handleScrollToSummit}
            aria-label="Scroll to view the upcoming Meta Summit flagship event"
          >
            VIEW UPCOMING FLAGSHIP SUMMIT <span className="arrow" aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentEvents;

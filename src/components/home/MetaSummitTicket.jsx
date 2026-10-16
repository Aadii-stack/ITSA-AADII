import React, { useEffect, useState, useRef } from 'react';
import './MetaSummitTicket.css';

const MetaSummitTicket = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ticketRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ticketRef.current) observer.observe(ticketRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ticket-section" ref={ticketRef}>
      <div className={`cyber-ticket-container ${isVisible ? 'ticket-pop' : ''}`}>
        <div className="ticket-grain-texture" />

        <div className="ticket-body">
          <div className="ticket-top-meta">
            <span className="cyber-edition">FLAGSHIP EVENT // COMING SOON</span>
          </div>

          <div className="ticket-main-title">
            <h2>META SUMMIT</h2>
            <p className="ticket-tagline">Where Technology Meets Possibility</p>
          </div>

          <div className="ticket-footer-meta">
            <div>
              <span className="meta-lbl">LOCATION</span>
              <span className="meta-val">SLRTCE AUDITORIUM</span>
            </div>
            <div>
              <span className="meta-lbl">EDITION</span>
              <span className="meta-val">2026–2027</span>
            </div>
            <div>
              <span className="meta-lbl">PASS TYPE</span>
              <span className="meta-val">ALL-ACCESS VIP</span>
            </div>
          </div>
        </div>

        <div className="ticket-perforation">
          <div className="notch top-notch" />
          <div className="dashed-divider" />
          <div className="notch bottom-notch" />
        </div>

        <div className="ticket-stub-vertical">
          <span className="vip-text">VIP ACCESS</span>
          <a href="/meta-summit" className="notify-btn">GET NOTIFIED ↗</a>
        </div>
      </div>
    </section>
  );
};

export default MetaSummitTicket;
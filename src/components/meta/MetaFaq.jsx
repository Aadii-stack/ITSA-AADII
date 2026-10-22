import React, { useState } from 'react';
import { metaSummitConfig } from '../../data/metaSummit';
import { ChevronDown } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from './Reveal';
import { WebCorner, SpiderMotif } from './MetaDecor';
import './MetaFaq.css';

export default function MetaFaq() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      className="meta-faq-section section-py meta-hairline"
      aria-labelledby="faq-heading"
    >
      <span className="meta-ghost-word meta-ghost-faq" aria-hidden="true">
        Summit
      </span>
      <WebCorner className="meta-faq-web" orientation="br" />
      <SpiderMotif className="meta-faq-spider" />

      <div className="container-wide meta-faq-inner">
        <Reveal className="section-intro">
          <div className="circuit-label">
            <span className="circuit-dot"></span>
            04 / Information & Guidance
          </div>
          <h2 id="faq-heading" className="section-title">
            Frequently Asked Questions
          </h2>
          <p className="section-subtitle">
            Essential information regarding attendee eligibility, registration policies, and certification.
          </p>
        </Reveal>

        <Stagger className="faq-accordion-list" stagger={0.09}>
          {metaSummitConfig.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <StaggerItem key={idx}>
                <div className={`faq-card ${isOpen ? 'open' : ''}`}>
                  <div className="faq-card-inner">
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                    >
                      <span className="faq-question-text">{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                      />
                    </button>
                    <div
                      id={`faq-answer-${idx}`}
                      className={`faq-answer-container ${isOpen ? 'open' : ''}`}
                    >
                      <div className="faq-answer-inner">
                        <p className="faq-answer-text">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

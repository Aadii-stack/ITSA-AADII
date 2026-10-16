import React, { useState } from 'react';
import './ElasticGallery.css';

// Dynamically import all images inside src/assets/initiatives/
const initiativeImages = import.meta.glob('../../assets/initiatives/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});

// Convert imported object into an array of URLs
const loadedImages = Object.values(initiativeImages);

const initiativesData = [
  {
    id: "01",
    title: "Technical Mentorship",
    category: "Mentorship",
    desc: "Guiding students through modern tech stacks, career roadmaps, and industry standards.",
  },
  {
    id: "02",
    title: "Hackathons & Sprints",
    category: "Competitions",
    desc: "Hands-on coding marathons and project building events like GameForge & AI Fusion.",
  },
  {
    id: "03",
    title: "Community & Networking",
    category: "Community",
    desc: "Connecting tech enthusiasts, alumni, and industry experts under one ecosystem.",
  },
  {
    id: "04",
    title: "Workshops & Bootcamps",
    category: "Skill Building",
    desc: "Practical sessions covering Web Development, Cloud Computing, and Machine Learning.",
  },
  {
    id: "05",
    title: "Innovation Hub",
    category: "R&D",
    desc: "Supporting student-led research, startup concepts, and software solutions.",
  },
];

const ElasticGallery = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="elastic-section">
      <div className="elastic-header">
        <span className="gold-tag">WHAT WE DO</span>
        <h2>OUR CORE INITIATIVES</h2>
        <p className="elastic-sub">Hover over any pillar to explore how ITSA drives technical growth.</p>
      </div>

      <div className="elastic-container" onMouseLeave={() => setActiveId(null)}>
        {initiativesData.map((item, index) => {
          const isActive = activeId === item.id;
          const isHoveringAny = activeId !== null;

          // Assign dynamic image from assets/initiatives or fallback
          const imageSrc = loadedImages[index % loadedImages.length] || '';

          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              className={`elastic-card ${
                isActive ? 'is-active' : isHoveringAny ? 'is-shrunk' : 'is-default'
              }`}
            >
              <div className="elastic-bg-wrapper">
                {imageSrc && <img src={imageSrc} alt={item.title} className="elastic-img" />}
                <div className={`elastic-gradient ${isActive ? 'visible' : ''}`} />
              </div>

              <div className="elastic-content">
                <div className={`active-details ${isActive ? 'show' : 'hide'}`}>
                  <span className="category-pill">{item.category}</span>
                  <h3 className="elastic-title">{item.title}</h3>
                  <p className="elastic-desc">{item.desc}</p>
                </div>

                <div className={`inactive-details ${isActive ? 'hide' : 'show'}`}>
                  <span className="vertical-title">{item.title}</span>
                  <span className="card-id-badge">{item.id}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ElasticGallery;
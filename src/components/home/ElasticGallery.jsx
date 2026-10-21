import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  const shouldReduceMotion = useReducedMotion();

  const handleCardKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveId((prev) => (prev === id ? null : id));
    }
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 32,
      scale: shouldReduceMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="elastic-section">
      <motion.div
        className="elastic-header"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <span className="gold-tag">/// WHAT WE DO</span>
        <h2>OUR CORE INITIATIVES</h2>
        <p className="elastic-sub">Explore how ITSA drives technical mastery and peer collaboration at SLRTCE.</p>
      </motion.div>

      <motion.div
        className="elastic-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        onMouseLeave={() => setActiveId(null)}
      >
        {initiativesData.map((item, index) => {
          const isActive = activeId === item.id;
          const isHoveringAny = activeId !== null;

          // Assign dynamic image from assets/initiatives or fallback
          const imageSrc = loadedImages[index % loadedImages.length] || '';

          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              tabIndex={0}
              role="button"
              aria-expanded={isActive}
              aria-label={`${item.title} (${item.category}). Press Enter to toggle details.`}
              onClick={() => setActiveId((prev) => (prev === item.id ? null : item.id))}
              onMouseEnter={() => setActiveId(item.id)}
              onKeyDown={(e) => handleCardKeyDown(e, item.id)}
              className={`elastic-card ${
                isActive ? 'is-active' : isHoveringAny ? 'is-shrunk' : 'is-default'
              }`}
            >
              <div className="elastic-bg-wrapper">
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="elastic-img"
                  />
                )}
                <div className={`elastic-gradient ${isActive ? 'visible' : ''}`} />
              </div>

              <div className="elastic-content">
                <div className={`active-details ${isActive ? 'show' : 'hide'}`}>
                  <span className="category-pill">{item.category}</span>
                  <h3 className="elastic-title">{item.title}</h3>
                  <p className="elastic-desc">{item.desc}</p>
                </div>

                <div className={`inactive-details ${isActive ? 'hide' : 'show'}`}>
                  <span className="card-id-badge">{item.id}</span>
                  <span className="vertical-title">{item.title}</span>
                  <span className="mobile-inactive-title">{item.title}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ElasticGallery;

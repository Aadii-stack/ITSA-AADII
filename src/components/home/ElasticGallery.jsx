import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ConcaveCarousel from '../ui/ConcaveCarousel';
import './ElasticGallery.css';

// Import authentic initiatives images
import technicalImg from '../../assets/initiatives/technical.jpeg';
import hackathonsImg from '../../assets/initiatives/hackathons.jpeg';
import mentorshipImg from '../../assets/initiatives/mentorship.jpeg';
import workshopImg from '../../assets/initiatives/workshop.jpeg';
import innovationImg from '../../assets/initiatives/innovation.jpeg';

const initiativesData = [
  {
    id: "01",
    title: "Technical Mentorship",
    category: "Mentorship",
    desc: "Guiding students through modern tech stacks, career roadmaps, and industry standards.",
    src: technicalImg,
  },
  {
    id: "02",
    title: "Hackathons & Sprints",
    category: "Competitions",
    desc: "Hands-on coding marathons and project building events like GameForge & AI Fusion.",
    src: hackathonsImg,
  },
  {
    id: "03",
    title: "Community & Networking",
    category: "Community",
    desc: "Connecting tech enthusiasts, alumni, and industry experts under one ecosystem.",
    src: mentorshipImg,
  },
  {
    id: "04",
    title: "Workshops & Bootcamps",
    category: "Skill Building",
    desc: "Practical sessions covering Web Development, Cloud Computing, and Machine Learning.",
    src: workshopImg,
  },
  {
    id: "05",
    title: "Innovation Hub",
    category: "R&D",
    desc: "Supporting student-led research, startup concepts, and software solutions.",
    src: innovationImg,
  },
];

const ElasticGallery = () => {
  const shouldReduceMotion = useReducedMotion();

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

      <ConcaveCarousel
        images={initiativesData}
        startIndex={0}
        curvature={0.72}
        distance={4}
        tilt={0}
        autoplay="drift"
        speed={0.16}
        aspect={1.25}
        gap={20}
        radius={16}
        reflection={0.08}
        dim={0.35}
      />
    </section>
  );
};

export default ElasticGallery;

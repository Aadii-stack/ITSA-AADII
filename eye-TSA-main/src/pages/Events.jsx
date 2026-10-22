import React, { useState, useEffect, useRef, useCallback } from 'react';
import { upcomingEvents } from '../data/events';
import EventCard from '../components/events/EventCard';
import EmptyUpcomingState from '../components/events/EmptyUpcomingState';
import {
  Calendar,
  Info,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  MapPin,
  Users,
  X,
} from 'lucide-react';
import heroBg from '../assets/hero-bg.png';
import hackathonImg from '../assets/initiatives/hackathons.jpeg';
import workshopImg from '../assets/initiatives/workshop.jpeg';
import technicalImg from '../assets/initiatives/technical.jpeg';
import innovationImg from '../assets/initiatives/innovation.jpeg';
import mentorshipImg from '../assets/initiatives/mentorship.jpeg';

// Authentic event photographic assets
import gameforgeCover from '../assets/events/gameforge/gameforge-cover.jpg';
import gameforgeGal1 from '../assets/events/gameforge/gameforge-gallery-1.jpg';
import gameforgeGal2 from '../assets/events/gameforge/gameforge-gallery-2.jpg';
import gameforgeGal3 from '../assets/events/gameforge/gameforge-gallery-3.jpg';

import aiFusionCover from '../assets/events/ai-fusion/ai-fusion-cover.jpg';
import aiFusionGal1 from '../assets/events/ai-fusion/ai-fusion-gallery-1.jpg';
import aiFusionGal2 from '../assets/events/ai-fusion/ai-fusion-gallery-2.jpg';
import aiFusionGal3 from '../assets/events/ai-fusion/ai-fusion-gallery-3.jpg';

import cbpSyCover from '../assets/events/cbp-sy/cbp-sy-cover.jpg';
import cbpSyGal1 from '../assets/events/cbp-sy/cbp-sy-gallery-1.jpg';
import cbpSyGal2 from '../assets/events/cbp-sy/cbp-sy-gallery-2.jpg';
import cbpSyGal3 from '../assets/events/cbp-sy/cbp-sy-gallery-3.jpg';

import cbpTyCover from '../assets/events/cbp-ty/cbp-ty-cover.jpg';
import cbpTyGal1 from '../assets/events/cbp-ty/cbp-ty-gallery-1.jpg';
import cbpTyGal2 from '../assets/events/cbp-ty/cbp-ty-gallery-2.jpg';
import cbpTyGal3 from '../assets/events/cbp-ty/cbp-ty-gallery-3.jpg';

import './Events.css';

// Synchronized timing configuration for hero background rotation and progress fill (approx. 3s)
const HERO_SLIDE_DURATION = 3000;

// Automatic rotation duration for opened event detail gallery (approx. 3.5s)
const MODAL_SLIDE_DURATION = 3500;

// Authentic event records data referencing official notices and local assets under src/assets/events/
const eventsData = [
  {
    id: 'gameforge-2026',
    title: 'GameForge — Game Development Hackathon',
    category: 'Hackathons',
    date: '13 – 20 August 2026 • 3:00 PM onwards',
    datePreview: '13 – 20 Aug 2026',
    dateBadge: { month: 'AUG', day: '13–20' },
    time: '3:00 PM onwards',
    venue: 'Room 512, 5th Floor, SLRTCE',
    participants: 'SE to BE IT Students',
    badge: '• OFFICIAL ITSA EVENT',
    description:
      'An intensive game development hackathon introducing students to fundamentals of game design, game engines, and modern development tools.',
    fullDescription:
      'Organized by the Department of Information Technology through the Information Technology Student Association (ITSA) for Second Year to Final Year Engineering Students. The hackathon introduced fundamentals of game design, modern game engines, and prototype development within a limited timeframe. The structured competition featured an initial Topic Discussion on 13 August 2026, followed by PPT Submission and an Elimination Round on 14 August 2026, culminating in the Final Judging Round on 20 August 2026 where teams pitched functional prototypes.',
    coverImage: gameforgeCover,
    images: [gameforgeGal1, gameforgeGal2, gameforgeGal3],
    highlights: [
      'Topic Discussion (13 Aug) & Problem Statement Briefing',
      'PPT Submission & Elimination Round (14 Aug)',
      'Final Prototype Demonstration & Judging Round (20 Aug)',
      'Game Engine Fundamentals & Tool Exploration',
      'Team-Based Creative Prototyping & Problem Solving',
    ],
    registrationLink: 'https://forms.gle/7KHDMXcns8nzdMebA',
    organizedBy: 'Department of Information Technology — ITSA',
    isDemo: false,
  },
  {
    id: 'ai-fusion-2026',
    title: 'AI-Fusion: Experience the Future of AI Creation',
    category: 'Workshops',
    date: '29 September 2026 • 3:15 PM – 4:15 PM',
    datePreview: '29 Sep 2026',
    dateBadge: { month: 'SEP', day: '29' },
    time: '3:15 PM – 4:15 PM',
    venue: 'Lab 503, 5th Floor, SLRTCE',
    participants: 'Department of IT Students',
    badge: '• OFFICIAL ITSA EVENT',
    description:
      'A hands-on workshop introducing students to modern Artificial Intelligence tools for creative generation, content creation, and academic productivity.',
    fullDescription:
      'Organized by the Department of Information Technology (ITSA) on 29 September 2026 in Lab 503 to introduce students to the fundamentals and practical applications of modern Artificial Intelligence suites for creative and academic purposes. The hands-on session encompassed AI-powered content writing, generative image and video workflows, prompt-to-PPT creation tools, and collaborative problem-solving exercises.',
    coverImage: aiFusionCover,
    images: [aiFusionGal1, aiFusionGal2, aiFusionGal3],
    highlights: [
      'Modern AI Tools for Creative & Academic Work',
      'Hands-On AI Content Writing & Exploration',
      'Generative AI Image & Video Synthesis Workflows',
      'Prompt-to-PPT Creation & Automated Deck Design',
      'Interactive Online AI Problem-Solving Activities',
    ],
    organizedBy: 'Department of Information Technology — ITSA',
    isDemo: false,
  },
  {
    id: 'cbp-sy-2026',
    title: 'Capacity Building Program (CBP) — SY',
    category: 'Speaker Sessions',
    date: '1 October 2026 onwards (Thursdays) • 10:15 AM – 11:15 AM',
    datePreview: '01 Oct 2026 onwards',
    dateBadge: { month: 'OCT', day: '01' },
    time: '10:15 AM – 11:15 AM',
    venue: '5th Floor, SLRTCE',
    participants: 'Second Year IT Students',
    badge: '• OFFICIAL ITSA EVENT',
    description:
      'A foundational self-leadership and cognitive development initiative designed to help Second Year IT students cultivate focus, prioritization, and emotional intelligence.',
    fullDescription:
      'Organized by the Department of Information Technology through ITSA specifically for Second Year Engineering Students. Commencing 1 October 2026 and continuing every Thursday from 10:15 AM to 11:15 AM on the 5th Floor, this program bridges modern behavioral psychology with time-tested wisdom to help students understand the mechanics of focus, overcome distractions, practice meditation, and develop values-based decision-making.',
    coverImage: cbpSyCover,
    images: [cbpSyGal1, cbpSyGal2, cbpSyGal3],
    highlights: [
      'Mind & Intelligence: Understanding Causes of an Uncontrolled Mind',
      'Modern & Vedic Wisdom with Sustainable Solutions',
      'Practical Meditation & Mental Focus Techniques',
      'Goal-Setting, Prioritization & Self-Leadership Skills',
      'Values-Based Decision-Making for Academic & Personal Growth',
    ],
    organizedBy: 'Department of Information Technology — ITSA',
    isDemo: false,
  },
  {
    id: 'cbp-ty-2026',
    title: 'Capacity Building Program (CBP) — TY',
    category: 'Speaker Sessions',
    date: '1 October 2026 onwards (Thursdays) • 9:15 AM – 11:15 AM',
    datePreview: '01 Oct 2026 onwards',
    dateBadge: { month: 'OCT', day: '01' },
    time: '9:15 AM – 11:15 AM',
    venue: '5th Floor, SLRTCE',
    participants: 'Third Year IT Students',
    badge: '• OFFICIAL ITSA EVENT',
    description:
      'An advanced personal effectiveness and decision-making program equipping Third Year IT students with self-leadership and purposeful habit formation.',
    fullDescription:
      'Organized by the Department of Information Technology through ITSA tailored for Third Year (TY) Engineering Students. Commencing 1 October 2026 and continuing every Thursday from 9:15 AM to 11:15 AM on the 5th Floor, the program fosters executive maturity, stress resilience, high-accountability habit loops, and clarity of purpose as students approach pre-placement and final-year engineering capstones.',
    coverImage: cbpTyCover,
    images: [cbpTyGal1, cbpTyGal2, cbpTyGal3],
    highlights: [
      'Mind-Intelligence Relationship & Cognitive Self-Regulation',
      'Long-Lasting Solutions & Meditation Techniques',
      'Self-Leadership, Prioritization & Execution Discipline',
      'Strengthening Values-Based Decision-Making & Ethics',
      'Positive Habit Formation & Responsible Leadership',
    ],
    organizedBy: 'Department of Information Technology — ITSA',
    isDemo: false,
  },
];

const eventCategoriesList = [
  'All',
  'Hackathons',
  'Workshops',
  'Speaker Sessions',
];

// Existing local photographic references for hero background
const heroSlides = [
  {
    id: 'hackathons',
    image: hackathonImg,
    tag: 'HACK SPRINTS // COMPETITIVE CODING',
    label: 'Hackathons & Sprints',
    subtitle: 'Competitive coding marathons, algorithmic challenges, and departmental sprints designed to forge rapid real-world engineering problem solving.',
  },
  {
    id: 'workshops',
    image: workshopImg,
    tag: 'HANDS-ON LABS // SYSTEM ARCHITECTURE',
    label: 'Hands-on Technical Workshops',
    subtitle: 'Interactive laboratory workshops covering component architecture, open-source git workflows, and hands-on software development principles.',
  },
  {
    id: 'technical',
    image: technicalImg,
    tag: 'ENGINEERING LABS // CLOUD',
    label: 'Cloud & Infrastructure Labs',
    subtitle: 'Deep-dive explorations of containerization, scalable cloud infrastructure, and automated deployment pipelines guiding student projects to industry standards.',
  },
  {
    id: 'campus',
    image: heroBg,
    tag: 'CAMPUS // DEPARTMENTAL INITIATIVES',
    label: 'SLRTCE IT Student Community',
    subtitle: 'Departmental student initiatives, peer tech mentoring networks, and project symposiums uniting the IT student community at SLRTCE.',
  },
];

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSlide, setActiveSlide] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [textSlide, setTextSlide] = useState(0);
  const [textFading, setTextFading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  useEffect(() => {
    document.title = 'Events & Workshops Archive — ITSA | SLRTCE';
    window.scrollTo(0, 0);
  }, []);

  // Preload all hero photographic backgrounds for smooth, stutter-free transitions
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Continuous automatic hero slideshow rotation (respecting reduced motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
      setAnimKey((prev) => prev + 1);
    }, HERO_SLIDE_DURATION);

    return () => {
      clearTimeout(timer);
    };
  }, [activeSlide, animKey]);

  // Subtle 550ms staggered transition for hero supporting text / subtitle
  useEffect(() => {
    setTextFading(true);
    const textTimer = setTimeout(() => {
      setTextSlide(activeSlide);
      setTextFading(false);
    }, 550);

    return () => {
      clearTimeout(textTimer);
    };
  }, [activeSlide]);

  // Manual slide selection: immediately switch photo and reset progress animation
  const handleSlideSelect = useCallback((idx) => {
    setActiveSlide(idx);
    setAnimKey((prev) => prev + 1);
  }, []);

  // Previous and next hero arrow navigation
  const handlePrevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setAnimKey((prev) => prev + 1);
  }, []);

  const handleNextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    setAnimKey((prev) => prev + 1);
  }, []);

  // Modal open and close handlers
  const handleOpenDetail = useCallback((event) => {
    setSelectedEvent(event);
    setModalImageIndex(0);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  // Automatic slideshow rotation for opened event detail gallery (respecting reduced motion)
  useEffect(() => {
    if (!selectedEvent || !selectedEvent.images || selectedEvent.images.length <= 1) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setTimeout(() => {
      setModalImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }, MODAL_SLIDE_DURATION);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedEvent, modalImageIndex]);

  // Body scroll lock and keyboard interactions for detail overlay
  useEffect(() => {
    if (!selectedEvent) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseDetail();
      } else if (e.key === 'ArrowRight' && selectedEvent.images?.length > 1) {
        setModalImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
      } else if (e.key === 'ArrowLeft' && selectedEvent.images?.length > 1) {
        setModalImageIndex(
          (prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEvent, handleCloseDetail]);

  // Smooth scroll helper
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter events based on active category
  const filteredEvents =
    activeCategory === 'All'
      ? eventsData
      : eventsData.filter((e) => e.category === activeCategory);

  return (
    <div className="events-page-view">
      {/* Cinematic Photography-Led Hero Section */}
      <section
        className="events-hero-section"
        aria-labelledby="events-page-title"
        style={{ '--hero-slide-duration': `${HERO_SLIDE_DURATION}ms` }}
      >
        {/* Photographic Background Carousel */}
        <div className="events-hero-bg-carousel" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`events-hero-bg-slide ${index === activeSlide ? 'is-active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          ))}
          {/* Multi-layered dark & gold gradients to balance photo vibrance with text legibility */}
          <div className="events-hero-gradient-overlay" />
          <div className="events-hero-ambient-glow" />
          <div className="events-hero-reading-scrim" />
        </div>

        {/* Elegant Previous / Next Navigation Arrows */}
        <button
          type="button"
          className="hero-arrow-btn hero-arrow-left"
          aria-label="Previous slide"
          onClick={handlePrevSlide}
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          className="hero-arrow-btn hero-arrow-right"
          aria-label="Next slide"
          onClick={handleNextSlide}
        >
          <ChevronRight size={22} />
        </button>

        <div className="container-wide events-hero-content-wrap">
          {/* Top Badge & Topic Row */}
          <div className="hero-top-row">
            <div className="circuit-label hero-circuit-pill">
              <span className="circuit-dot pulse-gold"></span>
              ITSA EVENTS // SLRTCE
            </div>
            <span className="hero-slide-badge font-mono">
              {heroSlides[activeSlide].tag}
            </span>
          </div>

          <div className="events-hero-header text-center">
            <h1 id="events-page-title" className="events-hero-title">
              Events
            </h1>

            {/* Staggered supporting text container (550ms delay) */}
            <div className={`hero-text-stagger-box ${textFading ? 'is-fading' : 'is-visible'}`}>
              <div className="hero-supporting-kicker font-mono">
                {heroSlides[textSlide].label}
              </div>
              <p className="events-hero-subtitle">
                {heroSlides[textSlide].subtitle}
              </p>
            </div>

            {/* Primary Navigation Actions */}
            <div className="events-hero-actions">
              <a
                href="#upcoming-section"
                className="btn btn-primary hero-action-btn"
                onClick={(e) => scrollToSection(e, 'upcoming-section')}
              >
                <span>Browse Upcoming</span>
                <ArrowDown size={15} />
              </a>

              <a
                href="#past-section"
                className="btn btn-secondary hero-action-btn"
                onClick={(e) => scrollToSection(e, 'past-section')}
              >
                <span>Explore Archive</span>
                <ChevronRight size={15} />
              </a>
            </div>
          </div>

          {/* Hero Bottom Slide Controller Bar */}
          <div className="events-hero-bottom-bar">
            <div className="hero-slide-status font-mono">
              <span className="slide-counter-num">0{activeSlide + 1}</span>
              <span className="slide-counter-slash">/</span>
              <span className="slide-counter-total">0{heroSlides.length}</span>
              <span className="slide-topic-name">— {heroSlides[activeSlide].label}</span>
            </div>

            {/* Slide Navigation Controls */}
            <div className="events-hero-slide-controls" role="tablist" aria-label="Hero background controls">
              <div className="slide-dots-group">
                {heroSlides.map((slide, idx) => {
                  const isActive = idx === activeSlide;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Switch to slide: ${slide.label}`}
                      className={`hero-dot-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleSlideSelect(idx)}
                    >
                      <span className="hero-dot-track">
                        {isActive && (
                          <span
                            key={`fill-${idx}-${animKey}`}
                            className="hero-dot-fill"
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Upcoming Events */}
      <section
        id="upcoming-section"
        className="upcoming-events-section section-py-sm"
        aria-labelledby="upcoming-heading"
      >
        <div className="container-wide">
          <div className="section-header-row">
            <div>
              <div className="circuit-label">
                <span className="circuit-dot"></span>
                Phase A / Active Pipeline
              </div>
              <h2 id="upcoming-heading" className="section-title">
                Upcoming Events
              </h2>
            </div>
            <span className="event-count-badge">
              [ {upcomingEvents.length} SCHEDULED ]
            </span>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="events-grid">
              {upcomingEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} isUpcoming={true} />
              ))}
            </div>
          ) : (
            <EmptyUpcomingState />
          )}
        </div>
      </section>

      {/* Section 2: Past Events Archive */}
      <section
        id="past-section"
        className="past-events-section section-py"
        aria-labelledby="past-heading"
      >
        <div className="container-wide">
          <div className="past-section-header">
            <div>
              <div className="circuit-label">
                <span className="circuit-dot"></span>
                Phase B / Departmental Record
              </div>
              <h2 id="past-heading" className="section-title">
                Past Events & Completed Labs
              </h2>
              <p className="section-subtitle">
                A verified record of technical sessions and competitions organized under ITSA at SLRTCE.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="category-filter-bar" role="tablist" aria-label="Event category filters">
              {eventCategoriesList.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Spotlight Event Cards Grid */}
          <div className="events-grid-spotlight">
            {filteredEvents.map((evt) => (
              <article
                key={evt.id}
                className="event-spotlight-card"
                onClick={() => handleOpenDetail(evt)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenDetail(evt);
                  }
                }}
              >
                {/* Full card background photograph */}
                <img
                  src={evt.coverImage || evt.images[0]}
                  alt={evt.title}
                  className="event-card-bg-image"
                  loading="lazy"
                />

                {/* Dark translucent overlay so photo remains visible but subdued */}
                <div className="event-card-overlay" />

                {/* Top badges: category badge (top-left) & compact calendar-style date badge (top-right) */}
                <div className="event-card-top-row">
                  <span className="event-card-category-badge">
                    {evt.category}
                  </span>

                  <div
                    className="event-card-calendar-badge"
                    aria-label={`Date: ${evt.dateBadge?.month || 'OCT'} ${evt.dateBadge?.day || '01'}`}
                  >
                    <span className="cal-badge-month">{evt.dateBadge?.month || 'OCT'}</span>
                    <span className="cal-badge-day">{evt.dateBadge?.day || '01'}</span>
                  </div>
                </div>

                {/* Bottom area: show only event title, and Explore text + arrow near bottom-right */}
                <div className="event-card-bottom-content">
                  <h3 className="event-card-title">{evt.title}</h3>

                  <div className="event-card-action-bar">
                    <span className="event-explore-btn">
                      <span>Explore</span>
                      <ArrowUpRight size={14} className="explore-arrow-icon" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Departmental Record footer */}
          <div className="events-data-footer">
            <Info size={14} className="info-icon" />
            <span>
              Official departmental records managed via Department of Information Technology — ITSA SLRTCE.
            </span>
          </div>
        </div>
      </section>

      {/* Section 3: Explore Detail Overlay (Modal) */}
      {selectedEvent && (
        <div
          className="event-detail-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-event-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseDetail();
          }}
        >
          <div className="event-detail-modal-dialog">
            {/* Prominent Close Button */}
            <button
              type="button"
              className="event-modal-close-btn"
              onClick={handleCloseDetail}
              aria-label="Close event details"
            >
              <X size={18} strokeWidth={2.4} />
            </button>

            {/* Left Column: Visual Media & Gallery */}
            <div className="event-modal-media-col">
              <div className="event-modal-image-stage">
                {selectedEvent.images && selectedEvent.images.length > 0 ? (
                  selectedEvent.images.map((imgSrc, idx) => (
                    <img
                      key={`${selectedEvent.id}-img-${idx}`}
                      src={imgSrc}
                      alt={`${selectedEvent.title} visual ${idx + 1}`}
                      className={`event-modal-slide-img ${idx === modalImageIndex ? 'is-active' : ''}`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  ))
                ) : (
                  <img
                    src={workshopImg}
                    alt={selectedEvent.title}
                    className="event-modal-slide-img is-active"
                  />
                )}
                <div className="event-modal-img-gradient" />

                {/* Multiple Image Navigation Controls */}
                {selectedEvent.images && selectedEvent.images.length > 1 && (
                  <div className="event-modal-gallery-bar">
                    <button
                      type="button"
                      className="gallery-nav-btn prev"
                      aria-label="Previous image"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalImageIndex(
                          (prev) =>
                            (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length
                        );
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <span className="gallery-counter-pill">
                      {String(modalImageIndex + 1).padStart(2, '0')} / {String(selectedEvent.images.length).padStart(2, '0')}
                    </span>

                    <button
                      type="button"
                      className="gallery-nav-btn next"
                      aria-label="Next image"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalImageIndex(
                          (prev) => (prev + 1) % selectedEvent.images.length
                        );
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Event Information */}
            <div className="event-modal-info-col">
              <div className="event-modal-badges-row">
                <span className="event-modal-cat-badge">
                  {selectedEvent.category}
                </span>
                <span className="event-modal-demo-badge">
                  [DEMO ARCHIVE RECORD]
                </span>
              </div>

              <h2 id="modal-event-title" className="event-modal-title">
                {selectedEvent.title}
              </h2>

              {/* Demo Meta Info Pills */}
              <div className="event-modal-meta-grid">
                <div className="modal-meta-pill">
                  <Calendar size={13} className="pill-icon" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="modal-meta-pill">
                  <MapPin size={13} className="pill-icon" />
                  <span>{selectedEvent.venue}</span>
                </div>
                <div className="modal-meta-pill">
                  <Users size={13} className="pill-icon" />
                  <span>{selectedEvent.participants}</span>
                </div>
              </div>

              {/* Descriptions */}
              <div className="event-modal-desc-wrap">
                <p className="modal-lead-desc">{selectedEvent.description}</p>
                <p className="modal-full-desc">{selectedEvent.fullDescription}</p>
              </div>

              {/* Highlights */}
              {selectedEvent.highlights && (
                <div className="event-modal-highlights">
                  <h4 className="highlights-heading">KEY MODULES & TAKEAWAYS</h4>
                  <div className="highlights-pills-list">
                    {selectedEvent.highlights.map((h, i) => (
                      <span key={i} className="highlight-pill">
                        • {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="event-modal-footer">
                <Info size={13} className="modal-info-icon" />
                <span>
                  Official departmental record managed via Department of Information Technology — ITSA SLRTCE.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

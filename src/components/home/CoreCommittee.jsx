import React, { useState } from 'react';
import './CoreCommittee.css';
import placeholderImg from '../../assets/slrtce-logo.png';
import itsaLogo from '../../assets/itsa-logo.png';
import meetImg from '../../assets/team/meet-shah.png';
import shwetaImg from '../../assets/team/shweta-mishra.png';
import subhImg from '../../assets/team/subh-mishra.png';
import shivamImg from '../../assets/team/shivam-mishra.png';
import falakImg from '../../assets/team/falak-mujawar.png';
import krishnaImg from '../../assets/team/krishna-pandey.png';
import gajanandImg from '../../assets/team/gajanand-pandya.png';
import vinitImg from '../../assets/team/vinit-mishra.png'; 
import anushkaImg from '../../assets/team/anushka-kushwaha.png';
import rajImg from '../../assets/team/raj-patwa.png';

const initialCommitteeData = [
  {
    id: '1',
    name: 'MEET SHAH',
    position: 'Chairperson',
    department: 'Final Year IT',
    photo: meetImg,
    bio: 'Leading ITSA initiatives to build an active tech community and bridge campus developers with industry.',
    socials: { linkedin: 'https://www.linkedin.com/in/meetshahhhh/' },
  },
  {
    id: '2',
    name: 'SHWETA MISHRA',
    position: 'Vice Chairperson',
    department: 'Third Year IT',
    photo: shwetaImg,
    bio: 'Co-leading association operations, team execution, and departmental event coordination.',
    socials: { linkedin: 'https://www.linkedin.com/in/shweta-s-mishra', github: 'https://github.com/smish16' },
  },
  {
    id: '3',
    name: 'SUBH MISHRA',
    position: 'Secretary',
    department: 'Third Year IT',
    photo: subhImg,
    bio: 'Managing student community engagement, documentation, and inter-department relations.',
    socials: {},
  },
  {
    id: '4',
    name: 'SHIVAM MISHRA',
    position: 'Joint Secretary',
    department: 'Third Year IT',
    photo: shivamImg,
    bio: 'Supporting administrative workflows, event logistics, and member communications.',
    socials: { linkedin: 'https://www.linkedin.com/in/shivam-mishra-81b4bb314', github: 'https://github.com/Shivammishr134' },
  },
  {
    id: '5',
    name: 'FALAK MUJAWAR',
    position: 'Event Head',
    department: 'Third Year IT',
    photo: falakImg,
    bio: 'Directing event schedules, technical competition logistics, and audience experience.',
    socials: {},
  },
  {
    id: '6',
    name: 'KRISHNA PANDEY',
    position: 'Event Co-Head',
    department: 'Third Year IT',
    photo: krishnaImg,
    bio: 'Coordinating venue management, volunteer teams, and on-ground event workflows.',
    socials: {},
  },
  {
    id: '7',
    name: 'GAJANAND PANDYA',
    position: 'Event Co-Head',
    department: 'Third Year IT',
    photo: gajanandImg,
    bio: 'Supporting hackathon staging, technical tracks, and participant assistance.',
    socials: {},
  },
  {
    id: '8',
    name: 'VINIT MISHRA',
    position: 'Treasurer',
    department: 'Third Year IT',
    photo: vinitImg,
    bio: 'Overseeing financial planning, resource allocation, and budget transparency for association activities.',
    socials: { linkedin: 'https://www.linkedin.com/in/vinit-mishra' },
  },
  {
    id: '9',
    name: 'ANUSHKA KUSHWAHA',
    position: 'Social Media & Magazine Head',
    department: 'Third Year IT',
    photo: anushkaImg,
    bio: 'Leading creative design, official announcements, and annual departmental publications.',
    socials: {},
  },
  {
    id: '10',
    name: 'RAJ PATWA',
    position: 'Social Media & Magazine Co-Head',
    department: 'Third Year IT',
    photo: rajImg,
    bio: 'Curating digital content, technical articles, and social outreach across campus channels.',
    socials: {},
  },
];

const isValidUrl = (url) => {
  if (!url) return false;
  const trimmed = url.trim().replace(/\/$/, '');
  const genericRoots = ['https://linkedin.com', 'https://github.com', 'https://github.com/unknown-here-now', 'https://www.linkedin.com'];
  return !genericRoots.includes(trimmed);
};

const CoreCommittee = ({ members = initialCommitteeData }) => {
  const [activeFlippedId, setActiveFlippedId] = useState(null); // Click state
  const [hoverFlippedId, setHoverFlippedId] = useState(null);   // Hover state

  // Handle permanent flip lock via click
  const handleCardClick = (e, id) => {
    // Prevent toggling flip when clicking on a social link button
    if (e.target.closest('.social-btn')) return;
    setActiveFlippedId((prev) => (prev === id ? null : id));
  };

  const handleCardKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveFlippedId((prev) => (prev === id ? null : id));
    }
  };

  return (
    <section className="committee-section">
      <div className="committee-header">
        <span className="gold-tag">STUDENT LEADERSHIP • 2026–2027</span>
        <h2>MEET OUR CORE COMMITTEE</h2>
        <p className="committee-sub">
          Hover photo for pop-out • Click or press Enter to flip card for bio and verified profiles
        </p>
      </div>

      <div className="committee-grid">
        {members.map((member) => {
          // Card is flipped if permanently clicked OR hovered on the info section
          const isFlipped = activeFlippedId === member.id || hoverFlippedId === member.id;
          const hasLinkedin = isValidUrl(member.socials?.linkedin);
          const hasGithub = isValidUrl(member.socials?.github);
          const hasSocials = hasLinkedin || hasGithub;

          return (
            <div
              key={member.id}
              className={`popout-card-wrapper ${isFlipped ? 'is-flipped' : ''}`}
              onClick={(e) => handleCardClick(e, member.id)}
              onKeyDown={(e) => handleCardKeyDown(e, member.id)}
              tabIndex={0}
              role="button"
              aria-expanded={isFlipped}
              aria-label={`${member.name}, ${member.position}. Press Enter or Space to flip card for details.`}
            >
              <div className="popout-card-inner">
                {/* FRONT FACE */}
                <div className="popout-card-front">
                  <div className="bg-circuit-pattern" aria-hidden="true" />

                  {/* PHOTO CONTAINER: Pop-out scale on photo hover */}
                  <div className="popout-photo-container">
                    <div className="photo-backdrop-glow" aria-hidden="true" />
                    <img
                      src={member.photo || placeholderImg}
                      alt={member.name}
                      className="popout-member-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = placeholderImg;
                      }}
                    />
                  </div>

                  {/* DETAILS CONTAINER: Hover triggers card flip preview */}
                  <div
                    className="popout-card-body"
                    onMouseEnter={() => setHoverFlippedId(member.id)}
                    onMouseLeave={() => setHoverFlippedId(null)}
                  >
                    <span className="popout-badge">{member.position}</span>
                    <h3 className="popout-name">{member.name}</h3>
                    <p className="popout-dept">{member.department}</p>
                    <span className="flip-prompt" aria-hidden="true">CLICK / ENTER TO FLIP ↻</span>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className="popout-card-back"
                  onMouseLeave={() => setHoverFlippedId(null)}
                >
                  <div className="back-avatar-circle" aria-hidden="true">
                    <img src={itsaLogo} alt="" className="back-avatar-graphic" />
                  </div>

                  <span className="back-position-tag">{member.position}</span>
                  <h3 className="back-member-name">{member.name}</h3>
                  <p className="back-bio-text">{member.bio}</p>

                  <div className="social-links-row">
                    {hasLinkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="social-btn"
                        tabIndex={isFlipped ? 0 : -1}
                        aria-label={`${member.name} on LinkedIn (opens in new tab)`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        LinkedIn ↗
                      </a>
                    )}
                    {hasGithub && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="social-btn"
                        tabIndex={isFlipped ? 0 : -1}
                        aria-label={`${member.name} on GitHub (opens in new tab)`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub ↗
                      </a>
                    )}
                    {!hasSocials && (
                      <span className="social-dept-badge">ITSA SLRTCE</span>
                    )}
                  </div>
                  <span className="flip-prompt" aria-hidden="true">CLICK / ENTER TO RETURN ↻</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CoreCommittee;

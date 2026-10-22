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
    bio: 'Leading ITSA initiatives to build an active tech community at SLRTCE.',
    socials: { linkedin: 'https://www.linkedin.com/in/meetshahhhh/', github: 'https://github.com/unknown-here-now' },
  },
  {
    id: '2',
    name: 'SHWETA MISHRA',
    position: 'Vice Chairperson',
    department: 'Third Year IT',
    photo: shwetaImg,
    bio: 'Supporting the Chairperson in leading ITSA initiatives and managing day-to-day operations.',
    socials: { linkedin: 'https://www.linkedin.com/in/shweta-s-mishra', github: 'https://github.com/smish16' },
  },
  {
    id: '3',
    name: 'SUBH MISHRA',
    position: 'Secretary',
    department: 'Third Year IT',
    photo: subhImg,
    bio: 'Coordinating student engagement, logistics, and inter-department relations.',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    id: '4',
    name: 'SHIVAM MISHRA',
    position: 'Joint Secretary',
    department: 'Third Year IT',
    photo: shivamImg,
    bio: 'Supporting the Secretary in coordinating student engagement, logistics, and inter-department relations.',
    socials: { linkedin: 'https://www.linkedin.com/in/shivam-mishra-81b4bb314', github: 'https://github.com/Shivammishr134' },
  },
  {
    id: '5',
    name: 'FALAK MUJAWAR',
    position: 'Event Head',
    department: 'Third Year IT',
    photo: falakImg,
    bio: 'Overseeing event planning and execution to ensure successful student engagement.',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    id: '6',
    name: 'KRISHNA PANDEY',
    position: 'Event Co-Head',
    department: 'Third Year IT',
    photo: krishnaImg,
    bio: 'Supporting the Event Head in planning and executing events for successful student engagement.',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    id: '7',
    name: 'GAJANAND PANDYA',
    position: 'Event Co-Head',
    department: 'Third Year IT',
    photo: gajanandImg,
    bio: 'Supporting the Event Head in planning and executing events for successful student engagement.',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    id: '8',
    name: 'VINIT MISHRA',
    position: 'Treasurer',
    department: 'Third Year IT',
    photo: vinitImg,
    bio: 'Managing the financial aspects of student activities and resource allocation.',
    socials: { linkedin: 'https://www.linkedin.com/in/vinit-mishra', github: 'https://github.com' },
  },
  {
    id: '9',
    name: 'ANUSHKA KUSHWAHA',
    position: 'Social Media & Magazine Head',
    department: 'Third Year IT',
    photo: anushkaImg,
    bio: 'Overseeing social media management and magazine production.',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    id: '10',
    name: 'RAJ PATWA',
    position: 'Social Media & Magazine Co-Head',
    department: 'Third Year IT',
    photo: rajImg,
    bio: 'Overseeing social media management and magazine production.',
    socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
];

const CoreCommittee = ({ members = initialCommitteeData }) => {
  const [activeFlippedId, setActiveFlippedId] = useState(null); // Click state
  const [hoverFlippedId, setHoverFlippedId] = useState(null);   // Hover state

  // Handle permanent flip lock via click
  const handleCardClick = (e, id) => {
    // Prevent toggling flip when clicking on a social link button
    if (e.target.closest('.social-btn')) return;
    setActiveFlippedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="committee-section">
      <div className="committee-header">
        <span className="gold-tag">THE PEOPLE BEHIND ITSA</span>
        <h2>MEET OUR CORE COMMITTEE</h2>
        <p className="committee-sub">
          Hover photo for pop-out • Hover details or click card to flip
        </p>
      </div>

      <div className="committee-grid">
        {members.map((member) => {
          // Card is flipped if permanently clicked OR hovered on the info section
          const isFlipped = activeFlippedId === member.id || hoverFlippedId === member.id;

          return (
            <div
              key={member.id}
              className={`popout-card-wrapper ${isFlipped ? 'is-flipped' : ''}`}
              onClick={(e) => handleCardClick(e, member.id)}
            >
              <div className="popout-card-inner">
                {/* FRONT FACE */}
                <div className="popout-card-front">
                  <div className="bg-circuit-pattern" />

                  {/* PHOTO CONTAINER: Pop-out scale on photo hover */}
                  <div className="popout-photo-container">
                    <div className="photo-backdrop-glow" />
                    <img
                      src={member.photo || placeholderImg}
                      alt={member.name}
                      className="popout-member-img"
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
                    <span className="flip-prompt">HOVER / CLICK TO FLIP ↻</span>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className="popout-card-back"
                  onMouseLeave={() => setHoverFlippedId(null)}
                >
                  <div className="back-avatar-circle">
                    <img src={itsaLogo} alt="ITSA Logo" className="back-avatar-graphic" />
                  </div>

                  <span className="back-position-tag">{member.position}</span>
                  <h3 className="back-member-name">{member.name}</h3>
                  <p className="back-bio-text">{member.bio}</p>

                  <div className="social-links-row">
                    {member.socials?.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="social-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        LinkedIn ↗
                      </a>
                    )}
                    {member.socials?.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="social-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                  <span className="flip-prompt">CLICK TO RETURN ↻</span>
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
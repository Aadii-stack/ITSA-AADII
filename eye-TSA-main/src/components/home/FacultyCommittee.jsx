import React, { useState } from 'react';
import './FacultyCommittee.css';
import placeholderImg from '../../assets/slrtce-logo.png';
import itsaLogo from '../../assets/itsa-logo.png';

const initialFacultyData = [
  {
    id: 'f1',
    name: 'Dr. Faculty Name',
    position: 'Head of Department',
    department: 'Information Technology',
    photo: placeholderImg,
    bio: 'Guiding the IT Department towards academic excellence, research, and innovation.',
  },
  {
    id: 'f2',
    name: 'Prof. Faculty Name',
    position: 'Faculty Convenor',
    department: 'Information Technology',
    photo: placeholderImg,
    bio: 'Overseeing ITSA student activities, event execution, and industry collaborations.',
  },
  {
    id: 'f3',
    name: 'Prof. Faculty Name',
    position: 'Faculty Co-Convenor',
    department: 'Information Technology',
    photo: placeholderImg,
    bio: 'Mentoring student committees in project development and technical workshops.',
  },
  {
    id: 'f4',
    name: 'Prof. Faculty Name',
    position: 'Technical Advisor',
    department: 'Information Technology',
    photo: placeholderImg,
    bio: 'Advising hackathons, cloud computing initiatives, and research papers.',
  },
  {
    id: 'f5',
    name: 'Prof. Faculty Name',
    position: 'Logistics Incharge',
    department: 'Information Technology',
    photo: placeholderImg,
    bio: 'Coordinating departmental resources, venue management, and event operations.',
  },
];

const FacultyCommittee = ({ faculties = initialFacultyData }) => {
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [zoomedFaculty, setZoomedFaculty] = useState(null);

  const handleFlip = (e, id) => {
    // Prevent flipping when image zoom is clicked
    if (e.target.closest('.faculty-photo-box')) return;
    setFlippedCardId((prev) => (prev === id ? null : id));
  };

  const handleImageClick = (e, faculty) => {
    e.stopPropagation(); // Stop click from flipping the card
    setZoomedFaculty(faculty);
  };

  return (
    <section className="faculty-section">
      <div className="faculty-header">
        <span className="gold-tag">/// FACULTY ADVISORS</span>
        <h2>OUR GUIDING FACULTIES</h2>
        <p className="faculty-sub">Click a card to flip and view details. Click on the profile photo to expand.</p>
      </div>

      <div className="faculty-grid">
        {faculties.map((faculty) => {
          const isFlipped = flippedCardId === faculty.id;

          return (
            <div
              key={faculty.id}
              className={`faculty-flip-card ${isFlipped ? 'is-flipped' : ''}`}
              onClick={(e) => handleFlip(e, faculty.id)}
            >
              <div className="faculty-card-inner">
                {/* FRONT FACE */}
                <div className="faculty-card-front">
                  <div
                    className="faculty-photo-box"
                    onClick={(e) => handleImageClick(e, faculty)}
                    title="Click to Zoom Photo"
                  >
                    <img src={faculty.photo || placeholderImg} alt={faculty.name} />
                    <div className="zoom-hint-overlay">🔍 VIEW</div>
                    <div className="faculty-badge">{faculty.position}</div>
                  </div>
                  <div className="faculty-info-front">
                    <h3>{faculty.name}</h3>
                    <p>{faculty.department}</p>
                    <span className="flip-hint">CLICK TO FLIP ↻</span>
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="faculty-card-back">
                  <div className="back-content">
                    {/* Avatar graphic placeholder */}
                    <div className="back-avatar-container">
                      <img src={itsaLogo} alt="ITSA Graphic Avatar" className="back-avatar-graphic" />
                    </div>

                    <span className="back-pos">{faculty.position}</span>
                    <h3>{faculty.name}</h3>
                    <p className="back-bio">{faculty.bio}</p>
                    <span className="flip-back-hint">CLICK TO GO BACK ↻</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIGHTBOX POPUP IMAGE ZOOM */}
      {zoomedFaculty && (
        <div className="photo-lightbox-overlay" onClick={() => setZoomedFaculty(null)}>
          <div className="photo-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setZoomedFaculty(null)}>✕</button>
            <div className="lightbox-image-wrapper">
              <img src={zoomedFaculty.photo || placeholderImg} alt={zoomedFaculty.name} />
            </div>
            <div className="lightbox-info">
              <h3>{zoomedFaculty.name}</h3>
              <p>{zoomedFaculty.position}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FacultyCommittee;
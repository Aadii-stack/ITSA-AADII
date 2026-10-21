import React, { useState, useEffect, useRef } from 'react';
import './FacultyCommittee.css';
import placeholderImg from '../../assets/slrtce-logo.png';
import itsaLogo from '../../assets/itsa-logo.png';

const initialFacultyData = [
  {
    id: 'f1',
    name: 'Head of Department',
    position: 'HOD, Information Technology',
    department: 'Department of Information Technology',
    photo: placeholderImg,
    bio: 'Providing academic direction, institutional leadership, and curriculum mentorship for student engineering excellence.',
  },
  {
    id: 'f2',
    name: 'Faculty Convenor',
    position: 'Faculty In-Charge, ITSA',
    department: 'Department of Information Technology',
    photo: placeholderImg,
    bio: 'Guiding student committee leadership, coordinating flagship departmental initiatives, and aligning with institutional standards.',
  },
  {
    id: 'f3',
    name: 'Faculty Co-Convenor',
    position: 'Faculty Co-Convenor, ITSA',
    department: 'Department of Information Technology',
    photo: placeholderImg,
    bio: 'Mentoring student teams in workshop organization, student engagement, and technical project delivery.',
  },
  {
    id: 'f4',
    name: 'Technical Project Advisor',
    position: 'Technical Advisor, ITSA',
    department: 'Department of Information Technology',
    photo: placeholderImg,
    bio: 'Advising hackathon development tracks, cloud computing labs, and student open-source software contributions.',
  },
  {
    id: 'f5',
    name: 'Student Activities Coordinator',
    position: 'Departmental Logistics Coordinator',
    department: 'Department of Information Technology',
    photo: placeholderImg,
    bio: 'Facilitating laboratory infrastructure, event venue resources, and administrative support for departmental functions.',
  },
];

const FacultyCommittee = ({ faculties = initialFacultyData }) => {
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [zoomedFaculty, setZoomedFaculty] = useState(null);
  const closeButtonRef = useRef(null);

  // Keyboard escape handling and body lock for lightbox
  useEffect(() => {
    if (!zoomedFaculty) return;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setZoomedFaculty(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomedFaculty]);

  const handleFlip = (e, id) => {
    // Prevent flipping when image zoom is clicked
    if (e.target.closest('.faculty-photo-box')) return;
    setFlippedCardId((prev) => (prev === id ? null : id));
  };

  const handleCardKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlippedCardId((prev) => (prev === id ? null : id));
    }
  };

  const handleImageClick = (e, faculty) => {
    e.stopPropagation(); // Stop click from flipping the card
    setZoomedFaculty(faculty);
  };

  const handleImageKeyDown = (e, faculty) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      setZoomedFaculty(faculty);
    }
  };

  return (
    <section className="faculty-section">
      <div className="faculty-header">
        <span className="gold-tag">/// ACADEMIC MENTORSHIP</span>
        <h2>OUR FACULTY ADVISORS</h2>
        <p className="faculty-sub">Guiding the Information Technology Student Association towards academic and technical leadership.</p>
      </div>

      <div className="faculty-grid">
        {faculties.map((faculty) => {
          const isFlipped = flippedCardId === faculty.id;

          return (
            <div
              key={faculty.id}
              className={`faculty-flip-card ${isFlipped ? 'is-flipped' : ''}`}
              onClick={(e) => handleFlip(e, faculty.id)}
              onKeyDown={(e) => handleCardKeyDown(e, faculty.id)}
              tabIndex={0}
              role="button"
              aria-expanded={isFlipped}
              aria-label={`${faculty.name}, ${faculty.position}. Press Enter or Space to flip card.`}
            >
              <div className="faculty-card-inner">
                {/* FRONT FACE */}
                <div className="faculty-card-front">
                  <div
                    className="faculty-photo-box"
                    onClick={(e) => handleImageClick(e, faculty)}
                    onKeyDown={(e) => handleImageKeyDown(e, faculty)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Enlarge photo of ${faculty.name}`}
                    title="Click or press Enter to zoom photo"
                  >
                    <img src={faculty.photo || placeholderImg} alt={faculty.name} loading="lazy" />
                    <div className="zoom-hint-overlay" aria-hidden="true">🔍 VIEW</div>
                    <div className="faculty-badge">{faculty.position}</div>
                  </div>
                  <div className="faculty-info-front">
                    <h3>{faculty.name}</h3>
                    <p>{faculty.department}</p>
                    <span className="flip-hint" aria-hidden="true">CLICK / ENTER TO FLIP ↻</span>
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="faculty-card-back">
                  <div className="back-content">
                    {/* Avatar graphic placeholder */}
                    <div className="back-avatar-container" aria-hidden="true">
                      <img src={itsaLogo} alt="" className="back-avatar-graphic" />
                    </div>

                    <span className="back-pos">{faculty.position}</span>
                    <h3>{faculty.name}</h3>
                    <p className="back-bio">{faculty.bio}</p>
                    <span className="flip-back-hint" aria-hidden="true">CLICK / ENTER TO GO BACK ↻</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIGHTBOX POPUP IMAGE ZOOM */}
      {zoomedFaculty && (
        <div 
          className="photo-lightbox-overlay" 
          onClick={() => setZoomedFaculty(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged photo of ${zoomedFaculty.name}`}
        >
          <div className="photo-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              ref={closeButtonRef}
              className="lightbox-close-btn" 
              onClick={() => setZoomedFaculty(null)}
              aria-label="Close enlarged photo view"
            >
              ✕
            </button>
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

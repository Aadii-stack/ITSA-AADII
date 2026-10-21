import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PreLoader from './components/home/PreLoader';
import Hero from './components/home/Hero';
import BigTitleBanner from './components/home/BigTitleBanner';
import ElasticGallery from './components/home/ElasticGallery';
import RecentEvents from './components/home/RecentEvents';
import MetaSummitTicket from './components/home/MetaSummitTicket';
import FacultyCommittee from './components/home/FacultyCommittee';
import CoreCommittee from './components/home/CoreCommittee';
import AboutRedirect from './components/home/AboutRedirect';
import './App.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <PreLoader onComplete={handlePreloaderComplete} />}

      <div className="circuit-canvas-bg" aria-hidden="true"></div>

      <div className="app-wrapper">
        <Navbar />

        <main className="main-content" id="main-content">
          <Hero />
          <BigTitleBanner />
          <ElasticGallery />
          <AboutRedirect />
          <RecentEvents />
          <MetaSummitTicket />

          {/* Faculty Section with #faculty anchor */}
          <div id="faculty">
            <FacultyCommittee />
          </div>

          {/* Core Committee Section with #team anchor */}
          <div id="team">
            <CoreCommittee />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

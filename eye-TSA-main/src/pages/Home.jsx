import React, { useState } from 'react';
import PreLoader from '../components/home/PreLoader';
import Hero from '../components/home/Hero';
import BigTitleBanner from '../components/home/BigTitleBanner';
import ElasticGallery from '../components/home/ElasticGallery';
import RecentEvents from '../components/home/RecentEvents';
import MetaSummitTicket from '../components/home/MetaSummitTicket';
import FacultyCommittee from '../components/home/FacultyCommittee';
import CoreCommittee from '../components/home/CoreCommittee';
import AboutRedirect from '../components/home/AboutRedirect';

const Home = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <PreLoader onComplete={() => setLoading(false)} />}
      <main className={`home-wrapper ${loading ? 'is-loading' : 'is-ready'}`}>
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

      {/* Core Committee Section with #committee anchor */}
      <div id="committee">
      <CoreCommittee />
      </div>
      </main>
    </>
  );
};

export default Home;
import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import BigTitleBanner from '../components/home/BigTitleBanner';
import ElasticGallery from '../components/home/ElasticGallery';
import RecentEvents from '../components/home/RecentEvents';
import MetaSummitTicket from '../components/home/MetaSummitTicket';
import AboutRedirect from '../components/home/AboutRedirect';

export default function Home() {
  useEffect(() => {
    document.title = 'ITSA — Information Technology Student Association | SLRTCE';
  }, []);

  return (
    <>
      <Hero />
      <BigTitleBanner />
      <ElasticGallery />
      <AboutRedirect />
      <RecentEvents />
      <MetaSummitTicket />
    </>
  );
}

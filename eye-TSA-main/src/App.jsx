import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import PreLoader from './components/home/PreLoader'; // Make sure path matches
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import MetaSummit from './pages/MetaSummit';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if preloader has already run in this session
    const hasLoadedBefore = sessionStorage.getItem('itsa_has_loaded');
    if (hasLoadedBefore) {
      setIsLoading(false);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('itsa_has_loaded', 'true');
    setIsLoading(false);
  };

  return (
    <BrowserRouter>
      {/* Run PreLoader ONLY on first initial site visit */}
      {isLoading && <PreLoader onComplete={handlePreloaderComplete} />}

      <ScrollToTop />
      <div className="circuit-canvas-bg" aria-hidden="true"></div>

      <div className="app-wrapper">
        <Navbar />

        <main className="main-content" id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/meta-summit" element={<MetaSummit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
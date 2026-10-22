import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/layout/ScrollToTop';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import Home from './pages/Home';
import './App.css';

// Code-split route components for optimal initial payload
const About = lazy(() => import('./pages/About'));
const Events = lazy(() => import('./pages/Events'));
const Team = lazy(() => import('./pages/Team'));
const MetaSummit = lazy(() => import('./pages/MetaSummit'));
const NotFound = lazy(() => import('./pages/NotFound'));

const RouteFallback = () => (
  <div className="circuit-route-loader" role="status" aria-label="Loading page content">
    <div className="loader-pulse-core" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      {/* Keyboard Accessibility Skip Link */}
      <a href="#main-content" className="skip-to-content-link">
        Skip to main content
      </a>

      <ScrollToTop />
      <div className="circuit-canvas-bg" aria-hidden="true" />

      <div className="app-wrapper">
        <Navbar />

        <main className="main-content" id="main-content">
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/team" element={<Team />} />
                <Route path="/meta-summit" element={<MetaSummit />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

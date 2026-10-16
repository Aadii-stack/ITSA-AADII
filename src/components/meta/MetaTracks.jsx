import React from 'react';
import { metaSummitConfig } from '../../data/metaSummit';
import { Reveal, Stagger, StaggerItem } from './Reveal';
import { SpiderMotif } from './MetaDecor';
import texture from '../../assets/meta/meta-city-texture.png';
import './MetaTracks.css';

export default function MetaTracks() {
  return (
    <section
      id="meta-tracks"
      className="meta-tracks-section section-py meta-hairline"
      aria-labelledby="tracks-heading"
    >
      <span className="meta-ghost-word meta-ghost-tracks" aria-hidden="true">
        Circuit
      </span>

      <div className="container-wide meta-tracks-inner">
        <Reveal className="section-intro">
          <div className="circuit-label">
            <span className="circuit-dot"></span>
            02 / Engineering Domains
          </div>
          <h2 id="tracks-heading" className="section-title">
            Curated Technical Tracks
          </h2>
          <p className="section-subtitle">
            Core subject areas designed for student immersion, hands-on lab sessions, and technical project exhibitions.
          </p>
        </Reveal>

        <Stagger className="tracks-grid" stagger={0.12}>
          {metaSummitConfig.tracks.map((track, idx) => (
            <StaggerItem
              key={track.code}
              className={`track-card-clip-wrap ${idx % 2 === 0 ? 'track-wrap--crimson' : 'track-wrap--blue'}`}
            >
              <div className="track-card-clip">
                <div className="track-card">
                  <div
                    className="track-card-texture"
                    style={{ backgroundImage: `url(${texture})` }}
                    aria-hidden="true"
                  ></div>
                  <span className="track-num" aria-hidden="true">
                    {track.code.split('-')[1]}
                  </span>

                  <div className="track-card-header">
                    <span className="track-code-badge font-mono">{track.code}</span>
                    <span className="track-status-dot"></span>
                  </div>

                  <div className="track-card-body">
                    <h3 className="track-title">{track.title}</h3>
                    <p className="track-description">{track.description}</p>

                    <div className="track-keywords">
                      {track.keywords.map((kw) => (
                        <span key={kw} className="kw-badge font-mono">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="track-card-footer font-mono">
                    <span>CONVENTION TRACK</span>
                    <span className="circuit-coord">NODE // {track.code}</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <SpiderMotif className="meta-tracks-spider" />
    </section>
  );
}

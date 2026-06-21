import React from 'react';
import './AboutV2.css';
import { aboutData } from '../../data/aboutData';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function AboutV2() {
  const sectionRef = useScrollReveal();

  return (
    <section id="about" className="pf-sec pf-about" ref={sectionRef}>
      <div data-reveal className="pf-eyebrow">01 — About me</div>
      <div className="pf-about__grid">
        <div>
          <h2 data-reveal className="pf-about__heading">
            Senior engineer building at the intersection of{' '}
            <span className="pf-serif-italic">performance, AI,</span>
            {' '}and elegant code.
          </h2>
          <p data-reveal className="pf-about__p" style={{ transitionDelay: '0.1s' }}>
            {aboutData.description1}
          </p>
          {aboutData.description2 && (
            <p data-reveal className="pf-about__p" style={{ transitionDelay: '0.15s' }}>
              {aboutData.description2}
            </p>
          )}
        </div>
        <div data-reveal className="pf-about__right-col" style={{ transitionDelay: '0.2s' }}>
          <div className="pf-about__photo-wrap">
            <img
              src="/profile.jpg"
              alt="Soumya Ranjan Purohit"
              className="pf-about__photo"
            />
            <div className="pf-about__photo-glow" />
          </div>
          <div className="pf-about__stats">
            <div className="pf-stat-card">
              <div className="pf-stat-card__num">5+</div>
              <div className="pf-stat-card__label">years building products</div>
            </div>
            <div className="pf-stat-card">
              <div className="pf-stat-card__num">14+</div>
              <div className="pf-stat-card__label">projects shipped &amp; many unpublished</div>
            </div>
            <div className="pf-stat-card">
              <div className="pf-stat-card__num">1.6M+</div>
              <div className="pf-stat-card__label">users on production systems</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutV2;

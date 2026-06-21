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
            Full-stack developer who cares about{' '}
            <span className="pf-serif-italic">clean, elegant</span>
            {' '}and efficient code.
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
        <div data-reveal className="pf-about__stats" style={{ transitionDelay: '0.2s' }}>
          <div className="pf-stat-card">
            <div className="pf-stat-card__num">2+</div>
            <div className="pf-stat-card__label">years building products</div>
          </div>
          <div className="pf-stat-card">
            <div className="pf-stat-card__num">10+</div>
            <div className="pf-stat-card__label">projects shipped</div>
          </div>
          <div className="pf-stat-card">
            <div className="pf-stat-card__num">M.Sc</div>
            <div className="pf-stat-card__label">Electronics, GGU</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutV2;

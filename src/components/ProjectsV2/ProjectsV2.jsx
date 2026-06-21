import React, { useRef, useState } from 'react';
import './ProjectsV2.css';
import { projectsData } from '../../data/projectsData';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function ProjectsV2() {
  const sectionRef = useScrollReveal();
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const CARD_W = 360;
  const GAP = 22;

  function scrollTo(idx) {
    const clamped = Math.max(0, Math.min(idx, projectsData.length - 1));
    setActiveIdx(clamped);
    if (trackRef.current) {
      trackRef.current.scrollTo({
        left: clamped * (CARD_W + GAP),
        behavior: 'smooth',
      });
    }
  }

  function onScroll() {
    if (!trackRef.current) return;
    const idx = Math.round(trackRef.current.scrollLeft / (CARD_W + GAP));
    setActiveIdx(Math.max(0, Math.min(idx, projectsData.length - 1)));
  }

  return (
    <section id="work" className="pf-sec pf-projects" ref={sectionRef}>
      <div data-reveal className="pf-eyebrow">03 — Selected work</div>
      <div className="pf-projects__header">
        <h2 data-reveal className="pf-sec-heading pf-sec-heading--no-mb" style={{ transitionDelay: '0.05s', marginBottom: 0 }}>Things I've built</h2>
        <div className="pf-projects__nav">
          <button
            className="pf-projects__nav-btn"
            onClick={() => scrollTo(activeIdx - 1)}
            disabled={activeIdx === 0}
            aria-label="Previous project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span className="pf-projects__counter">{activeIdx + 1} / {projectsData.length}</span>
          <button
            className="pf-projects__nav-btn"
            onClick={() => scrollTo(activeIdx + 1)}
            disabled={activeIdx === projectsData.length - 1}
            aria-label="Next project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div className="pf-projects__track" ref={trackRef} onScroll={onScroll}>
        {projectsData.map((p, i) => (
          <article
            key={p.id}
            className={`pf-project-card${i === activeIdx ? ' pf-project-card--active' : ''}`}
          >
            <div className="pf-project-card__thumb">
              {p.image ? (
                <img src={p.image} alt={p.projectName} className="pf-project-card__img" />
              ) : (
                <span className="pf-project-card__placeholder">[ screenshot ]</span>
              )}
              {i === 0 && <span className="pf-project-card__award">★ Awarded</span>}
            </div>
            <div className="pf-project-card__body">
              <h3 className="pf-project-card__name">{p.projectName}</h3>
              <p className="pf-project-card__desc">{p.projectDesc}</p>
              <div className="pf-project-card__tags">
                {p.tags.map(t => (
                  <span key={t} className="pf-tag pf-tag--outline">{t}</span>
                ))}
              </div>
              <div className="pf-project-card__actions">
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="pf-project-card__demo">
                    Live demo
                  </a>
                )}
                {p.code && (
                  <a href={p.code} target="_blank" rel="noreferrer" className="pf-project-card__code">
                    {'</>'}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="pf-projects__dots">
        {projectsData.map((_, i) => (
          <button
            key={i}
            className={`pf-projects__dot${i === activeIdx ? ' pf-projects__dot--active' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default ProjectsV2;

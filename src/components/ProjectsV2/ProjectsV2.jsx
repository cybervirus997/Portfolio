import React from 'react';
import './ProjectsV2.css';
import { projectsData } from '../../data/projectsData';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function ProjectsV2() {
  const sectionRef = useScrollReveal();

  return (
    <section id="work" className="pf-sec pf-projects" ref={sectionRef}>
      <div data-reveal className="pf-eyebrow">03 — Selected work</div>
      <h2 data-reveal className="pf-sec-heading" style={{ transitionDelay: '0.05s' }}>Things I've built</h2>

      <div className="pf-projects__grid">
        {projectsData.slice(0, 6).map((p, i) => (
          <article
            key={p.id}
            data-reveal
            className="pf-project-card"
            style={{ transitionDelay: `${i * 0.08}s` }}
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
    </section>
  );
}

export default ProjectsV2;

import React from 'react';
import './ExperienceV2.css';
import { experienceData } from '../../data/experienceData';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function ExperienceV2() {
  const sectionRef = useScrollReveal();

  return (
    <section id="experience" className="pf-sec pf-exp" ref={sectionRef}>
      <div data-reveal className="pf-eyebrow">02 — Experience</div>
      <h2 data-reveal className="pf-sec-heading" style={{ transitionDelay: '0.05s' }}>Where I've worked</h2>

      <div className="pf-exp__list">
        {experienceData.map((exp, i) => (
          <div
            key={exp.id}
            data-reveal
            className="pf-exp__card"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="pf-exp__card-header">
              <div>
                <h3 className="pf-exp__title">
                  {exp.jobtitle} · <span className="pf-accent">{exp.company}</span>
                </h3>
                {exp.companyNote && (
                  <span className="pf-exp__company-note">{exp.companyNote}</span>
                )}
                {exp.clients && (
                  <div className="pf-exp__clients">Clients: {exp.clients}</div>
                )}
              </div>
              <span className="pf-exp__dates">{exp.startYear} — {exp.endYear}</span>
            </div>

            {exp.isGrouped && exp.roles && (
              <div className="pf-exp__role-progression">
                {exp.roles.map((r, ri) => (
                  <span key={ri} className="pf-exp__role-chip">
                    <span className="pf-exp__role-dot" />
                    {r.title}
                    <span className="pf-exp__role-period">{r.period}</span>
                  </span>
                ))}
              </div>
            )}

            <div className="pf-exp__meta">{exp.location}</div>
            {exp.description && (
              <div className="pf-exp__desc">{exp.description}</div>
            )}

            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="pf-exp__bullets">
                {exp.highlights.map((h, j) => (
                  <li key={j}>
                    <span className="pf-exp__bullet-mark">▹</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="pf-exp__tags">
              {exp.skills.map(s => (
                <span key={s} className="pf-tag">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperienceV2;

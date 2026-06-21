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
              <h3 className="pf-exp__title">
                {exp.jobtitle} · <span className="pf-accent">{exp.company}</span>
              </h3>
              <span className="pf-exp__dates">{exp.startYear} — {exp.endYear}</span>
            </div>
            <div className="pf-exp__meta">{exp.location} · {exp.duration}</div>

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

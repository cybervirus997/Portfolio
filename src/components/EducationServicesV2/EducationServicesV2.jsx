import React from 'react';
import './EducationServicesV2.css';
import { educationData } from '../../data/educationData';
import { servicesData } from '../../data/servicesData';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const HOBBY_ICONS = { 'Electronic Bots': '🤖', 'Web Design': '🎨', 'Photography': '📷', 'Video Editing': '🎬' };
const DEFAULT_ICONS = ['🤖', '🎨', '📷', '🎬'];

function EducationServicesV2() {
  const sectionRef = useScrollReveal();

  return (
    <section className="pf-sec pf-edu-svc" ref={sectionRef}>
      <div className="pf-edu-svc__grid">

        {/* Education */}
        <div>
          <div data-reveal className="pf-eyebrow">04 — Education</div>
          <h2 data-reveal className="pf-sec-heading pf-sec-heading--sm" style={{ transitionDelay: '0.05s' }}>
            Academic path
          </h2>
          <div className="pf-timeline">
            {educationData.map((ed, i) => (
              <div
                key={ed.id}
                data-reveal
                className={`pf-timeline__item${i === educationData.length - 1 ? ' pf-timeline__item--last' : ''}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <span className="pf-timeline__dot" />
                <div>
                  <div className="pf-timeline__years">{ed.startYear} — {ed.endYear}</div>
                  <div className="pf-timeline__degree">{ed.course}</div>
                  <div className="pf-timeline__inst">{ed.institution}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies / Services */}
        <div>
          <div data-reveal className="pf-eyebrow">05 — Beyond code</div>
          <h2 data-reveal className="pf-sec-heading pf-sec-heading--sm" style={{ transitionDelay: '0.05s' }}>
            Also into
          </h2>
          <p data-reveal className="pf-edu-svc__sub" style={{ transitionDelay: '0.08s' }}>
            Hobbies I also offer as services — reach out if I can help.
          </p>
          <div data-reveal className="pf-hobbies" style={{ transitionDelay: '0.1s' }}>
            {servicesData.slice(0, 4).map((svc, i) => (
              <div key={svc.id} className="pf-hobby-card">
                <div className="pf-hobby-card__icon">
                  {HOBBY_ICONS[svc.title] || DEFAULT_ICONS[i % 4]}
                </div>
                <div className="pf-hobby-card__title">{svc.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EducationServicesV2;

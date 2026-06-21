import React from 'react';
import './MarqueeV2.css';

const SKILLS = [
  'JavaScript', 'TypeScript', 'Node.js', 'Express', 'React',
  'React Native', 'MongoDB', 'REST APIs', 'Next.js', 'Redux', 'TypeScript',
];

function MarqueeV2() {
  return (
    <div className="pf-marquee">
      <div className="pf-marquee__track">
        {[0, 1].map(i => (
          <div key={i} className="pf-marquee__set" aria-hidden={i > 0}>
            {SKILLS.map((s, j) => (
              <React.Fragment key={j}>
                <span className="pf-marquee__item">{s}</span>
                <span className="pf-marquee__sep">✦</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarqueeV2;

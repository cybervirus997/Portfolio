import React from 'react';
import './MarqueeV2.css';

const SKILLS = [
  'React Native', 'TypeScript', 'React.js', 'Next.js', 'OpenAI API',
  'LLM Streaming', 'WebSockets', 'Redux Toolkit', 'Node.js', 'Deepgram STT',
  'Generative AI', 'REST APIs', 'GraphQL', 'Mobile Security', 'D3.js',
  'Firebase', 'Redux-Saga', 'Prompt Engineering', 'JavaScript ES2022+', 'MongoDB',
];

function MarqueeV2() {
  return (
    <div className="pf-marquee">
      <span className="pf-marquee__label">Core Technologies &amp; Skills</span>
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

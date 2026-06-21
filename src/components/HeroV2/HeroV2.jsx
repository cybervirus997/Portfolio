import React, { useState, useEffect, useRef } from 'react';
import './HeroV2.css';
const ROLES = [
  'Senior Software Engineer',
  'React Native Engineer',
  'AI Integration Engineer',
  'Full-Stack Developer',
  'LLM & GenAI Builder',
  'Problem Solver',
];
const CV_URL = 'https://drive.google.com/file/d/1_rWRsYzrj1tr3BlDWrdu99XvnJduHY5p/view?usp=sharing';

function HeroV2() {
  const [typed, setTyped] = useState('');
  const stateRef = useRef({ ri: 0, ci: 0, deleting: false });

  useEffect(() => {
    let timer;
    function tick() {
      const s = stateRef.current;
      const word = ROLES[s.ri];
      if (!s.deleting) {
        s.ci++;
        setTyped(word.slice(0, s.ci));
        if (s.ci === word.length) { s.deleting = true; timer = setTimeout(tick, 1500); }
        else { timer = setTimeout(tick, 75); }
      } else {
        s.ci--;
        if (s.ci === 0) {
          s.deleting = false;
          s.ri = (s.ri + 1) % ROLES.length;
          setTyped('');
          timer = setTimeout(tick, 320);
        } else {
          setTyped(word.slice(0, s.ci));
          timer = setTimeout(tick, 40);
        }
      }
    }
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header id="top" className="pf-hero">
      <div className="pf-hero__glow" aria-hidden="true" />
      <div className="pf-hero__grid">

        {/* Left column */}
        <div className="pf-hero__left">
          <div className="pf-hero__badge">
            <span className="pf-hero__badge-dot" />
            Available for work
          </div>
          <div className="pf-hero__eyebrow">Senior Software Engineer · India</div>
          <h1 className="pf-hero__h1">
            Soumya Ranjan<br />
            Purohit<span className="pf-accent-dot">.</span>
          </h1>
          <p className="pf-hero__sub">
            I build reliable backends, secure APIs and full-stack products — currently shipping AI-powered experiences at GlobalLogic.
          </p>
          <div className="pf-hero__typer">
            <span className="pf-hero__prompt">&gt; </span>
            I'm a <span className="pf-hero__typed">{typed}</span>
            <span className="pf-hero__cursor" aria-hidden="true" />
          </div>
          <div className="pf-hero__actions">
            <a href="#work" className="pf-btn pf-btn--primary">
              View my work
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <a href={CV_URL} target="_blank" rel="noreferrer" className="pf-btn pf-btn--ghost">
              Download CV
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14"/></svg>
            </a>
          </div>
        </div>

        {/* Right column — portrait */}
        <div className="pf-hero__right">
          <div className="pf-hero__portrait-frame" aria-hidden="true" />
          <div className="pf-hero__portrait">
            <div className="pf-hero__portrait-placeholder">
              <span className="pf-hero__portrait-hint">[ your portrait ]</span>
              <span className="pf-hero__portrait-sub">330 × 410 · drop a clean headshot</span>
            </div>
          </div>
          <div className="pf-hero__badge-location" style={{ animation: 'pf-float 5s ease-in-out infinite' }}>
            <span className="pf-hero__badge-loc-label">based in</span>
            <span className="pf-hero__badge-loc-city">Bengaluru, Karnataka 📍</span>
          </div>
          <div className="pf-hero__badge-code" style={{ animation: 'pf-float 6s ease-in-out infinite 0.6s' }}>
            {'</>'}
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroV2;

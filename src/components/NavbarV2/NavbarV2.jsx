import React, { useState, useEffect } from 'react';
import './NavbarV2.css';
import { usePortfolioTheme } from '../../contexts/PortfolioThemeContext';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

function NavbarV2() {
  const [scrolled, setScrolled] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  usePortfolioTheme(); // ensures theme CSS vars are applied

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`pf-nav${scrolled ? ' pf-nav--scrolled' : ''}`}>
      <a href="#top" className="pf-nav__logo">
        <span className="pf-nav__mark">&lt;SRP</span>
        <span className="pf-accent-dot"> /&gt;</span>
      </a>

      <div className="pf-nav__links">
        <a href="#about"      className="pf-nav__link">about</a>
        <a href="#experience" className="pf-nav__link">experience</a>
        <a href="#work"       className="pf-nav__link">work</a>
        <button
          className="pf-nav__theme-btn"
          onClick={() => setSwitcherOpen(p => !p)}
          title="Theme switcher"
        >🎨</button>
        <a href="#contact" className="pf-nav__cta">
          Let's talk
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
        </a>
      </div>

      {switcherOpen && (
        <div className="pf-nav__switcher-popup">
          <ThemeSwitcher />
        </div>
      )}
    </nav>
  );
}

export default NavbarV2;

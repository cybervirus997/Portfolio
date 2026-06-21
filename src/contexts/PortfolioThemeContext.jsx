import React, { createContext, useContext, useState, useEffect } from 'react';

const ACCENTS = {
  Indigo:  '#545fc4',
  Purple:  '#823ae0',
  Emerald: '#3fc337',
  Coral:   '#f56539',
  Crimson: '#f03939',
  Pink:    '#ff4f93',
  Amber:   '#E9AD35',
  Mono:    '#B6B6B6',
};

const BACKGROUNDS = {
  Charcoal: { bg: '#151515', panel: '#1d1d1d', panel2: '#242424' },
  Ink:      { bg: '#0c0c0c', panel: '#161616', panel2: '#1d1d1d' },
  Slate:    { bg: '#15171c', panel: '#1d2027', panel2: '#262a33' },
};

const LS_ACCENT = 'pf_accent';
const LS_BG     = 'pf_bg';

export const PortfolioThemeContext = createContext();

export function PortfolioThemeProvider({ children }) {
  const [accent, setAccent] = useState(() => localStorage.getItem(LS_ACCENT) || 'Indigo');
  const [bg, setBg]         = useState(() => localStorage.getItem(LS_BG)     || 'Charcoal');

  useEffect(() => {
    const a = ACCENTS[accent] || ACCENTS.Indigo;
    const b = BACKGROUNDS[bg] || BACKGROUNDS.Charcoal;
    const root = document.documentElement;
    root.style.setProperty('--accent', a);
    root.style.setProperty('--bg', b.bg);
    root.style.setProperty('--panel', b.panel);
    root.style.setProperty('--panel2', b.panel2);
    document.body.style.background = b.bg;
    localStorage.setItem(LS_ACCENT, accent);
    localStorage.setItem(LS_BG, bg);
  }, [accent, bg]);

  return (
    <PortfolioThemeContext.Provider value={{ accent, setAccent, bg, setBg, ACCENTS, BACKGROUNDS }}>
      {children}
    </PortfolioThemeContext.Provider>
  );
}

export function usePortfolioTheme() {
  return useContext(PortfolioThemeContext);
}

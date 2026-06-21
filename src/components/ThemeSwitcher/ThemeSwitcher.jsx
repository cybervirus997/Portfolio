import React from 'react';
import './ThemeSwitcher.css';
import { usePortfolioTheme } from '../../contexts/PortfolioThemeContext';

function ThemeSwitcher() {
  const { accent, setAccent, bg, setBg, ACCENTS, BACKGROUNDS } = usePortfolioTheme();

  return (
    <div className="theme-switcher">
      <div className="theme-switcher__section">
        <p className="theme-switcher__label">Accent</p>
        <div className="theme-switcher__swatches">
          {Object.entries(ACCENTS).map(([name, color]) => (
            <button
              key={name}
              className={`theme-switcher__swatch${accent === name ? ' active' : ''}`}
              style={{ background: color }}
              title={name}
              onClick={() => setAccent(name)}
            />
          ))}
        </div>
      </div>
      <div className="theme-switcher__section">
        <p className="theme-switcher__label">Background</p>
        <div className="theme-switcher__bg-options">
          {Object.keys(BACKGROUNDS).map(name => (
            <button
              key={name}
              className={`theme-switcher__bg-btn${bg === name ? ' active' : ''}`}
              onClick={() => setBg(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitcher;

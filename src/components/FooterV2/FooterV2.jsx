import React from 'react';
import './FooterV2.css';

function FooterV2() {
  const year = new Date().getFullYear();
  return (
    <footer className="pf-footer">
      <span className="pf-footer__logo">soumya<span className="pf-accent-dot">.</span>dev</span>
      <span className="pf-footer__credit">Designed &amp; built with 💙 by Soumya Ranjan · © {year}</span>
    </footer>
  );
}

export default FooterV2;

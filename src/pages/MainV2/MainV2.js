import React from 'react';
import { Helmet } from 'react-helmet';

import { PortfolioThemeProvider } from '../../contexts/PortfolioThemeContext';
import NavbarV2 from '../../components/NavbarV2/NavbarV2';
import HeroV2 from '../../components/HeroV2/HeroV2';
import MarqueeV2 from '../../components/MarqueeV2/MarqueeV2';
import AboutV2 from '../../components/AboutV2/AboutV2';
import ExperienceV2 from '../../components/ExperienceV2/ExperienceV2';
import ProjectsV2 from '../../components/ProjectsV2/ProjectsV2';
import EducationServicesV2 from '../../components/EducationServicesV2/EducationServicesV2';
import ContactV2 from '../../components/ContactV2/ContactV2';
import FooterV2 from '../../components/FooterV2/FooterV2';

import '../../components/portfolio-shared.css';

function MainV2() {
  return (
    <PortfolioThemeProvider>
      <Helmet>
        <title>Soumya Ranjan Purohit — Portfolio</title>
      </Helmet>
      <div
        className="pf-root"
        style={{
          background: 'var(--bg)',
          color: '#ededed',
          fontFamily: "'Space Grotesk', sans-serif",
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        <NavbarV2 />
        <HeroV2 />
        <MarqueeV2 />
        <AboutV2 />
        <ExperienceV2 />
        <ProjectsV2 />
        <EducationServicesV2 />
        <ContactV2 />
        <FooterV2 />
      </div>
    </PortfolioThemeProvider>
  );
}

export default MainV2;

import React, { useState, useRef } from 'react';
import './ContactV2.css';
import { contactsData } from '../../data/contactsData';
import { socialsData } from '../../data/socialsData';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function ContactV2() {
  const [sent, setSent] = useState(false);
  const sectionRef = useScrollReveal();
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      if (formRef.current) formRef.current.reset();
    }, 300);
  };

  return (
    <section id="contact" className="pf-sec pf-contact" ref={sectionRef}>
      <div data-reveal className="pf-eyebrow">06 — Contact</div>
      <h2 data-reveal className="pf-contact__heading" style={{ transitionDelay: '0.05s' }}>
        Let's build something <span className="pf-serif-italic">together.</span>
      </h2>
      <p data-reveal className="pf-contact__sub" style={{ transitionDelay: '0.08s' }}>
        Have a role, a project or just want to say hi? My inbox is always open.
      </p>

      <div className="pf-contact__grid">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          data-reveal
          className="pf-contact__form"
        >
          <input
            type="text"
            placeholder="Your name"
            className="pf-input"
            required
          />
          <input
            type="email"
            placeholder="name@email.com"
            className="pf-input"
            required
          />
          <textarea
            placeholder="Type your message…"
            rows="5"
            className="pf-input pf-input--textarea"
            required
          />
          <button type="submit" className="pf-btn pf-btn--primary pf-contact__submit">
            <span>{sent ? 'Sent — thanks! ✓' : 'Send message'}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </form>

        <div data-reveal className="pf-contact__info" style={{ transitionDelay: '0.1s' }}>
          {contactsData.email && (
            <a href={`mailto:${contactsData.email}`} className="pf-contact__row">
              <span className="pf-contact__icon-wrap">@</span>
              <div>
                <div className="pf-contact__row-label">Email</div>
                <div className="pf-contact__row-val">{contactsData.email}</div>
              </div>
            </a>
          )}
          {contactsData.phone && (
            <a href={`tel:${contactsData.phone}`} className="pf-contact__row">
              <span className="pf-contact__icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              <div>
                <div className="pf-contact__row-label">Phone</div>
                <div className="pf-contact__row-val">+91 {contactsData.phone}</div>
              </div>
            </a>
          )}
          {contactsData.address && (
            <div className="pf-contact__row">
              <span className="pf-contact__icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <div>
                <div className="pf-contact__row-label">Location</div>
                <div className="pf-contact__row-val">{contactsData.address}</div>
              </div>
            </div>
          )}

          <div className="pf-contact__socials">
            {socialsData.github && (
              <a href={socialsData.github} target="_blank" rel="noreferrer" className="pf-social-link">
                GitHub ↗
              </a>
            )}
            {socialsData.linkedIn && (
              <a href={socialsData.linkedIn} target="_blank" rel="noreferrer" className="pf-social-link">
                LinkedIn ↗
              </a>
            )}
            {socialsData.stackOverflow && (
              <a href={socialsData.stackOverflow} target="_blank" rel="noreferrer" className="pf-social-link">
                Stack Overflow ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactV2;

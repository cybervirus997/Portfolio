import React, { useEffect, useRef, useState } from "react";
import { aboutData } from "../../data/aboutData";
import { experienceData } from "../../data/experienceData";
import { projectsData } from "../../data/projectsData";
import { educationData } from "../../data/educationData";
import { servicesData } from "../../data/servicesData";
import { skillsData } from "../../data/skillsData";
import { contactsData } from "../../data/contactsData";
import { socialsData } from "../../data/socialsData";
import "./Journey.css";

const chapters = [
  ["top", "Launch"],
  ["about", "The human"],
  ["experience", "The journey"],
  ["work", "Selected work"],
  ["playground", "Playground"],
  ["contact", "Say hello"],
];
const technologies = [
  ...new Set([
    "React Native",
    "TypeScript",
    "React.js",
    "Next.js",
    "OpenAI API",
    "LLM Streaming",
    "WebSockets",
    "Redux Toolkit",
    "Node.js",
    "Deepgram STT",
    "Generative AI",
    "REST APIs",
    "GraphQL",
    "Mobile Security",
    "D3.js",
    "Firebase",
    "Redux-Saga",
    "Prompt Engineering",
    "JavaScript ES2022+",
    "MongoDB",
    ...skillsData,
  ]),
];
const roles = [
  "Senior Software Engineer",
  "React Native Engineer",
  "AI Integration Engineer",
  "Full-Stack Developer",
  "LLM & GenAI Builder",
  "Problem Solver",
];
const cv =
  "https://drive.google.com/file/d/1_rWRsYzrj1tr3BlDWrdu99XvnJduHY5p/view?usp=sharing";
const initialLights = [false, true, false, true, true, true, false, true, false];
export function toggleLights(board, index) {
  return board.map((on, i) =>
    i === index ||
    (Math.floor(i / 3) === Math.floor(index / 3) &&
      Math.abs(i - index) === 1) ||
    Math.abs(i - index) === 3
      ? !on
      : on,
  );
}
const External = ({ href, children, ...props }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </a>
);
const Tags = ({ items }) => (
  <div className="j-tags">
    {items.map((x) => (
      <span key={x}>{x}</span>
    ))}
  </div>
);

function Playground() {
  const [board, setBoard] = useState(initialLights);
  const [moves, setMoves] = useState(0);
  const [hint, setHint] = useState(false);
  const won = board.every(Boolean);
  return (
    <div className="j-play-grid">
      <div className="j-puzzle-panel">
        <div className="j-label">A small detour / Signal puzzle</div>
        <h3>Bring the system online.</h3>
        <p>
          Light all nine nodes. Each tap flips a node and its direct neighbours.
          No timer. Just a little curiosity.
        </p>
        <div
          className="j-puzzle"
          role="group"
          aria-label="Nine-node signal puzzle"
        >
          {board.map((on, i) => (
            <button
              key={i}
              aria-label={`Node ${i + 1}, ${on ? "on" : "off"}`}
              aria-pressed={on}
              disabled={won}
              className={on ? "lit" : ""}
              onClick={() => {
                setBoard(toggleLights(board, i));
                setMoves(moves + 1);
              }}
            >
              <span />
            </button>
          ))}
        </div>
        <p className="j-game-status" role="status">
          {won
            ? `System online. Nicely done in ${moves} ${moves === 1 ? "move" : "moves"}!`
            : `${moves} moves · ${board.filter(Boolean).length}/9 nodes online`}
        </p>
        <div className="j-actions">
          <button
            className="j-btn secondary"
            onClick={() => {
              setBoard(initialLights);
              setMoves(0);
              setHint(false);
            }}
          >
            Reset puzzle
          </button>
          <button
            className="j-text-button"
            onClick={() => setHint(!hint)}
            aria-expanded={hint}
          >
            Need a hint?
          </button>
        </div>
        {hint && (
          <p className="j-hint">
            From the starting board, tap each corner once. Reset first if you
            have already made a move.
          </p>
        )}
      </div>
      <div className="j-tools">
        <div className="j-label">The AI toolbox</div>
        <h3>
          Stay curious.
          <br />
          Build what’s next.
        </h3>
        <p>
          A few places to explore AI, from ideas to working interfaces. External
          tools; availability and terms may change.
        </p>
        {[
          ["ChatGPT", "Think, explore & prototype", "https://chatgpt.com/"],
          ["Claude", "Write, reason & code", "https://claude.ai/"],
          [
            "Hugging Face",
            "Discover models & demos",
            "https://huggingface.co/",
          ],
          [
            "Google AI Studio",
            "Experiment with Gemini",
            "https://aistudio.google.com/",
          ],
        ].map(([name, desc, url]) => (
          <External key={name} href={url} className="j-tool">
            <span>
              <strong>{name}</strong>
              <small>{desc}</small>
            </span>
            <span aria-hidden="true">＋</span>
          </External>
        ))}
      </div>
    </div>
  );
}

export default function Journey() {
  const root = useRef(null);
  const [active, setActive] = useState("top");
  const [menu, setMenu] = useState(false);
  const [paused, setPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [copied, setCopied] = useState("");
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    document.title = "Soumya Ranjan Purohit — Engineer. Builder. Explorer.";
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setPaused(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const node = root.current;
    if (!window.IntersectionObserver) return;
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("j-visible");
            reveal.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    node.querySelectorAll("[data-enter]").forEach((el) => {
      el.classList.add("j-waiting");
      reveal.observe(el);
    });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
          entry.target.classList.toggle("j-in-view", entry.isIntersecting);
        }),
      { rootMargin: "-10% 0px -25% 0px" },
    );
    node.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    const visibility = () =>
      node.classList.toggle("j-hidden-tab", document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      reveal.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const shownProjects = projectsData.filter(
    (p) =>
      filter === "All" ||
      (filter === "React"
        ? p.tags.some((t) => t.toLowerCase().includes("react"))
        : p.tags.some((t) => /node|javascript/i.test(t))),
  );
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactsData.email);
      setCopied("Email copied.");
    } catch {
      setCopied("Please select and copy the email address below.");
    }
  }
  return (
    <div ref={root} className={`journey ${paused ? "j-paused" : ""}`}>
      <a href="#main" className="j-skip">
        Skip to content
      </a>
      <header className="j-nav">
        <a className="j-brand" href="#top" aria-label="Soumya, home">
          s<span>p</span>
          <i>.</i>
        </a>
        <nav
          aria-label="Main navigation"
          className={menu ? "is-open" : ""}
          id="journey-menu"
        >
          {chapters.slice(1).map(([id, text]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setMenu(false)}
            >
              {text}
            </a>
          ))}
        </nav>
        <div className="j-nav-controls">
          <button
            className="j-motion"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
          >
            {paused ? "Motion off" : "Motion on"}
            <span aria-hidden="true">{paused ? " ▷" : " Ⅱ"}</span>
          </button>
          <button
            className="j-menu"
            aria-expanded={menu}
            aria-controls="journey-menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      <aside className="j-chapters" aria-label="Journey chapters">
        {chapters.map(([id, text]) => (
          <a
            href={`#${id}`}
            key={id}
            aria-label={text}
            aria-current={active === id ? "location" : undefined}
          >
            <span /> <em>{text}</em>
          </a>
        ))}
      </aside>
      <main id="main">
        <section id="top" className="j-hero j-in-view">
          <div className="j-hero-top">
            <span>SOUMYA RANJAN PUROHIT</span>
            <span className="j-availability">
              <i /> Available for work
            </span>
          </div>
          <div className="j-hero-copy">
            <div className="j-label">Senior Software Engineer · India</div>
            <h1>
              Code meets
              <br />
              <span>possibility.</span>
            </h1>
            <p>
              I build reliable backends, secure APIs and full-stack products —
              currently shipping AI-powered experiences at GlobalLogic.
            </p>
            <div className="j-actions">
              <a className="j-btn" href="#work">
                Explore my work <span aria-hidden="true">＋</span>
              </a>
              <External className="j-resume" href={cv}>
                Download CV
              </External>
            </div>
          </div>
          <div className="j-orbit-scene" aria-hidden="true">
            <div className="j-orbit-grid" />
            <div className="j-orbit-halo" />
            <div className="j-sculpture">
              {Array.from({ length: 16 }, (_, i) => (
                <div className="j-ring" key={i} style={{ "--ring": i }} />
              ))}
              <div className="j-core" />
            </div>
            <div className="j-coordinate coord-a">CRAFT × INTELLIGENCE</div>
            <div className="j-coordinate coord-b">ALWAYS EXPLORING</div>
            <span className="j-orbit-dot dot-a" />
            <span className="j-orbit-dot dot-b" />
          </div>
          <div className="j-hero-bottom">
            <span>
              Bengaluru, Karnataka
              <br />
              <strong>Building with purpose. Shipping with care.</strong>
            </span>
            <a href="#about">
              Scroll to explore <span aria-hidden="true">↓</span>
            </a>
            <span className="j-hero-signature">
              Ideas into
              <br />
              <i>experiences.</i>
            </span>
          </div>
        </section>
        <div className="j-skill-ribbon">
          <span>THE STACK</span>
          <p>
            React Native <b>✳</b> TypeScript <b>✳</b> Generative AI <b>✳</b>{" "}
            WebSockets <b>✳</b> React.js <b>✳</b> Node.js
          </p>
        </div>
        <section id="about" className="j-section j-about">
          <div className="j-label" data-enter>
            The human behind the code
          </div>
          <div className="j-about-grid">
            <div data-enter>
              <h2>
                Built on curiosity.
                <br />
                Driven by <em>craft.</em>
              </h2>
              <div className="j-portrait">
                <img
                  src="/profile.jpg"
                  alt="Soumya Ranjan Purohit"
                  loading="lazy"
                  width="420"
                  height="440"
                />
                <span>
                  Soumya Ranjan Purohit
                  <br />
                  <small>Engineer. Builder. Problem solver.</small>
                </span>
              </div>
            </div>
            <div className="j-about-copy" data-enter>
              <h3>
                Senior engineer building at the intersection of performance, AI,
                and elegant code.
              </h3>
              <p>{aboutData.description1}</p>
              <p>{aboutData.description2}</p>
              <div className="j-stats">
                <div>
                  <strong>5+</strong>
                  <span>years building products</span>
                </div>
                <div>
                  <strong>14+</strong>
                  <span>projects shipped & many unpublished</span>
                </div>
                <div>
                  <strong>1.6M+</strong>
                  <span>users on production systems</span>
                </div>
              </div>
            </div>
          </div>
          <details className="j-stack" data-enter>
            <summary>
              Explore my toolkit & roles <span>＋</span>
            </summary>
            <Tags items={technologies} />
            <p>{roles.join(" · ")}</p>
          </details>
        </section>
        <section id="experience" className="j-section j-experience">
          <div className="j-section-title" data-enter>
            <div>
              <div className="j-label">The journey so far</div>
              <h2>
                Every chapter.
                <br />A bigger <em>challenge.</em>
              </h2>
            </div>
            <p>
              From embedded systems to real-time markets.
              <br />
              Now, intelligent experiences at scale.
            </p>
          </div>
          <div className="j-timeline">
            {experienceData.map((exp, i) => (
              <article key={exp.id} className="j-job" data-enter>
                <div className="j-job-date">
                  <span>
                    {exp.startYear} — {exp.endYear}
                  </span>
                  {i === 0 && <b>Current chapter</b>}
                </div>
                <div className="j-job-body">
                  <h3>{exp.company}</h3>
                  <h4>{exp.jobtitle}</h4>
                  <p className="j-job-location">{exp.location}</p>
                  <p>{exp.description}</p>
                  {exp.companyNote && <p>{exp.companyNote}</p>}
                  {exp.clients && <p>Clients: {exp.clients}</p>}
                  {exp.roles && (
                    <div className="j-roles">
                      {exp.roles.map((r) => (
                        <p key={r.title}>
                          <strong>{r.title}</strong> · {r.period}
                        </p>
                      ))}
                    </div>
                  )}
                  <Tags items={exp.skills} />
                  <details>
                    <summary>
                      Explore the impact <span>＋</span>
                    </summary>
                    <ul>
                      {exp.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="work" className="j-section j-work">
          <div className="j-section-title" data-enter>
            <div>
              <div className="j-label">Selected work</div>
              <h2>
                Ideas, out
                <br />
                in the <em>wild.</em>
              </h2>
            </div>
            <div
              className="j-filters"
              role="group"
              aria-label="Filter projects"
            >
              {["All", "React", "JavaScript / Node"].map((f) => (
                <button
                  key={f}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <p className="j-project-count" role="status">
            {shownProjects.length} projects to explore
          </p>
          <div className="j-project-grid">
            {shownProjects.map((p, i) => (
              <article className="j-project" key={p.id}>
                <External
                  href={p.demo}
                  className={`j-project-image project-tone-${p.id}`}
                  aria-label={`Open ${p.projectName} live demo`}
                >
                  <img
                    src={p.image}
                    alt={`${p.projectName} website preview`}
                    loading="lazy"
                    decoding="async"
                    width="720"
                    height="430"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="j-project-overlay">{p.projectName}</span>
                  {p.id === 1 && (
                    <span className="j-award">✳ Hackathon · Awarded</span>
                  )}
                </External>
                <div className="j-project-title">
                  <h3>{p.projectName}</h3>
                  <External
                    href={p.code}
                    aria-label={`${p.projectName} source code`}
                    className="j-source"
                  >
                    {"</>"}
                  </External>
                </div>
                <p>{p.projectDesc}</p>
                <Tags items={p.tags} />
                <External href={p.demo} className="j-project-link">
                  Explore live project
                </External>
              </article>
            ))}
          </div>
        </section>
        <section id="foundations" className="j-section j-foundations">
          <div data-enter>
            <div className="j-label">Where it started</div>
            <h2>
              The <em>foundations.</em>
            </h2>
            {educationData.map((ed) => (
              <article className="j-education" key={ed.id}>
                <span>
                  {ed.startYear} — {ed.endYear}
                </span>
                <h3>{ed.course}</h3>
                <p>{ed.institution}</p>
              </article>
            ))}
          </div>
          <div data-enter>
            <div className="j-label">Beyond code</div>
            <h2>
              Always <em>making.</em>
            </h2>
            <p>Hobbies I also offer as services — reach out if I can help.</p>
            <div className="j-hobbies">
              {servicesData.map((s, i) => (
                <div key={s.id}>
                  <span aria-hidden="true">{["⌘", "◈", "◎", "▷"][i]}</span>
                  <h3>{s.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="playground" className="j-section j-playground">
          <div className="j-section-title" data-enter>
            <div>
              <div className="j-label">Curiosity has a playground</div>
              <h2>
                A little less serious.
                <br />A little more <em>play.</em>
              </h2>
            </div>
            <span className="j-play-symbol" aria-hidden="true">
              ✳
            </span>
          </div>
          <Playground />
        </section>
        <section id="contact" className="j-section j-contact">
          <div className="j-label" data-enter>
            End of the scroll. Start of something.
          </div>
          <h2 data-enter>
            Let’s build
            <br />
            something <em>together.</em>
          </h2>
          <p>
            Have a role, a project or just want to say hi? My inbox is always
            open.
          </p>
          <div className="j-actions">
            <a className="j-btn" href={`mailto:${contactsData.email}`}>
              Start a conversation <span aria-hidden="true">＋</span>
            </a>
            <button className="j-text-button" onClick={copyEmail}>
              Copy email
            </button>
          </div>
          <p className="j-copy-status" role="status">
            {copied}
          </p>
          <a className="j-email" href={`mailto:${contactsData.email}`}>
            {contactsData.email}
          </a>
          <div className="j-contact-meta">
            <a href={`tel:+91${contactsData.phone}`}>
              +91 {contactsData.phone}
            </a>
            <span>{contactsData.address}</span>
          </div>
          <div className="j-socials">
            {Object.entries(socialsData).map(([name, href]) => (
              <External key={name} href={href}>
                {
                  {
                    github: "GitHub",
                    linkedIn: "LinkedIn",
                    codepen: "CodePen",
                    reddit: "CodeSandbox",
                    stackOverflow: "Stack Overflow",
                  }[name]
                }
              </External>
            ))}
          </div>
        </section>
      </main>
      <footer className="j-footer">
        <a className="j-brand" href="#top">
          sp<i>.</i>
        </a>
        <span>© {new Date().getFullYear()} Soumya Ranjan Purohit</span>
        <a href="#top">Back to the beginning</a>
      </footer>
    </div>
  );
}

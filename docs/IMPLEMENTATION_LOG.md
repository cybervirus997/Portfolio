# Implementation log

## 2026-11-19 — Cinematic portfolio journey

### Audit and content contract
Repository baseline `a618228`; React 17, CRA 4. Homepage previously MainV2.
Read all homepage components and data modules. Preserved both biography paragraphs,
all four career entries including every highlight and grouped role, all six projects
with descriptions/tags/source/demo URLs, three education entries, four services,
contact information, resume link, technology list, roles and existing headline metrics.
Original data files remain byte-for-byte unchanged. Prior designs remain routable.
No new personal claims. New editorial headings describe sections rather than credentials.

### Research and choices
- [web.dev animation guide](https://web.dev/articles/animations-guide): favour
  transform/opacity animation; avoid layout-triggering continuous effects.
- [W3C reduced motion](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html): respect
  OS motion preference and provide an explicit motion switch.
- [Three.js responsive rendering](https://threejs.org/manual/pages/responsive.html):
  considered GPU/render-resolution cost. Chose CSS 3D for this scene; a WebGL runtime
  and large models are unnecessary for an orbital sculpture.
- AI shelf destinations checked: [ChatGPT](https://chatgpt.com/),
  [Hugging Face](https://huggingface.co/), [Google AI Studio](https://aistudio.google.com/).
  Claude URL retained as a known external destination; research fetch was restricted.
  Shelf is a curated addition, not a claim that the owner uses/endorses these tools.

### Implemented
- Dark olive/acid-lime art direction, oversized editorial type, 3D orbit hero,
  CSS entrance animation and chapter-based scroll exploration.
- Native section links, desktop chapter indicator, mobile menu with Escape dismissal.
- Offscreen/hidden-tab animation pause; explicit motion control and OS preference sync.
- Reveals via IntersectionObserver; text stays visible if the API is unavailable.
- Portrait with progressive CSS scroll timeline; role/skill disclosure.
- Career timeline with complete impact lists inside keyboard-accessible details.
- All six projects with responsive grid, tag filtering, lazy images, 3D image hover,
  source links, and original demo links.
- Education/services, optional signal puzzle with reset/hint/live completion message,
  AI-tool links and contact/social footer.
- Honest mailto/tel links + clipboard success/error feedback.
- Lazy-loaded legacy home routes, reduced initial font requests, descriptive metadata.
- Compact future-session map in JOURNEY_CONTEXT.md.

### Cut/replaced/deferred (and why)
- Replaced the V2 typewriter and moving marquee on `/` with readable static roles/skills;
  avoid endless text movement and repeated timer renders.
- Replaced horizontal project carousel/fixed pixel offsets with a responsive grid;
  all projects are reachable without a hidden sideways interaction.
- Replaced fake “Sent” contact form with direct email handoff; no backend was configured.
- Removed global BackToTop overlay; explicit footer/chapter navigation replaces it.
- Legacy source and templates are retained for rollback, not deleted.
- Deferred video backgrounds, heavy WebGL, audio, scroll locking and external chatbot
  APIs: no content or performance justification, and no credentials needed here.
- No runtime framework upgrade in this visual change. Existing CRA/dependency age remains.
- Old font families load only with legacy routes; main journey loads three families.

### Validation
Final checks: `CI=true npm test -- --watchAll=false --runInBand`: 4/4 passed.
`npm run build`: passed (only three inherited legacy-component warnings).
`git diff --check`: passed. `git diff --exit-code -- src/data`: passed; original
content data is unchanged. Browser validation is blocked as described below.

### Environment repair
First npm install failed because the default home npm cache was not writable.
Retried with workspace-local cache; dependency versions/lockfile unchanged.

### Build/tooling follow-up
Added npm override `@babel/core: ^7.28.0` and updated package-lock after tests exposed
CRA's Babel 7.12.3 versus current syntax-plugin incompatibility. No runtime package
added. Use npm; the original yarn lock is retained, not the supported install path.
Added scripts/preview.cjs to translate preview --host/--port flags into CRA env vars.
Fixed import ordering in the route change and a new CSS flex alignment warning.
Formatted the new source for review. Added AGENTS.md to route future agents to the
short context map before searching all source files.

### Verification limit
Managed preview compiled, but the environment relay failed to open browser port
4173 (`timed out waiting for relay readiness`). No browser screenshots, viewport
checks, keyboard walkthrough, Lighthouse score or frame-rate measurement was possible.
Responsive breakpoints and motion guards are implemented, not device-benchmarked.
Existing warnings in legacy Contacts/Experience/Projects components remain; no
attempt to rewrite those unrelated components. Older external project demo URLs
are preserved and have not all been availability-tested. Contact depends on a local
mail client; clipboard failure has a visible fallback. GitHub branch only; no merge
or production deployment performed.

## 2026-11-19 — Branded career chapters and an interactive discovery sphere

### Requested correction
Changed current employer to **Hitachi Digital** in experienceData, aboutData,
Journey hero and legacy HeroV2. Replaced its old logo reference. This is an explicit
user-approved content correction; dates, role, clients and accomplishments stay intact.
The official current brand was checked at https://www.hitachidigital.com/.

### Implemented
- Career chapters now have original local company marks, brand-coloured accents,
  connected cards, descriptive chapter titles and focus labels drawn from existing
  experience. Existing expandable highlights and grouped roles remain unchanged.
- Visual metadata is separate in `src/data/careerChapters.js`, keyed by experience ID.
  Add a metadata entry when adding a new job. Original marks/provenance are recorded
  in `public/brands/SOURCES.md`; assets were visually inspected.
- Replaced decorative aria-hidden sphere with `InteractiveSphere.jsx`: native button,
  pointer-reactive tilt, tap/Enter/Space activation, fact card, another-fact action,
  sources/chapter links, dismiss button and Escape with focus return.
- Facts live in `src/data/sphereFacts.js`. Add `{id, category, title, text, href, source}`;
  cite external claims, use unique IDs, and keep copy concise. Random selection excludes
  the previous fact. No server, API calls, credentials, timer or persistence needed.
- Seed facts use existing portfolio content plus paraphrased facts checked against
  [NASA](https://science.nasa.gov/sun/facts/) and
  [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).
- Fact card stays open until dismissed or an internal chapter link is used, allowing
  reading at the visitor's pace. Polite screen-reader announcement does not steal focus.
- Pointer tilt is scheduled once per animation frame only on pointer events; reduced
  motion/pause disables it. Touch keeps normal page scrolling. Portal avoids clipping
  the toast in the hero. Existing offscreen sphere animation pause stays in place.

### Decisions / scope
No separate journey route was added: the interactive sphere enriches the current
homepage journey and facts can link to its chapters. A standalone exploration page
remains a later extension. No drag-to-spin gesture, WebGL runtime or generated logo.

### Verification
7/7 tests pass across two suites, including no stale employer name, four logo images,
fact dismissal/focus return, motion-off discovery, non-repeating selection and existing
content/puzzle/filter checks. Preview retry again failed at the managed browser relay
(port 4173 readiness timeout); browser layout/device checks remain unverified.
`npm run build` passed with only the same three inherited legacy warnings.
`git diff --check` passed. No production merge or deployment.

## 2026-11-19 — GitHub-researched 3D observatory upgrade

User asked to research open-source 3D/animation websites and make the portfolio richer.
Read GitHub repository metadata/licenses and relevant source/docs from Bruno Simon,
Codrops and pmndrs. See `docs/ANIMATION_RESEARCH.md` for exact links, adaptations and
tradeoffs. No portfolio template, source-demo images or models were copied.

### Implemented
- Actual progressive WebGL orb: procedural particles, faceted core, wireframe shell,
  three orbital arcs, background points. Orbit / Constellation / Signal mode buttons.
- `OrbitalVisual.jsx` lazy-loads `orbitalEngine.js`; CSS sphere remains during loading
  and on unsupported WebGL, initialization failure, context loss, Save-Data or pause.
- `JourneyAtlas.jsx`: an original interactive constellation map with five destinations,
  selected chapter preview and native links to all existing sections. Mobile layout
  stacks map and preview; keyboard buttons and polite preview announcements retained.
- Perspective gallery entry using progressive native CSS view timelines, image shine,
  animated map orbits and reading progress. Motion preference respected throughout.
- New MIT Three.js dependency pinned at 0.132.2 for CRA 4 compatibility; separated
  from initial JS. License retained in public/licenses/three-MIT.txt.

### Performance decisions
One GPU context, no textures/models/postprocessing; <=1.5 DPR; 600/1400 sphere points
by viewport width; 30fps target; no per-frame React state. Canvas renders only while
visible and tab active. Resources disposed on pause/unmount/context loss. This
supersedes the earlier decision to defer WebGL after the user's request for richer 3D.

### Replaced / retained
CSS-only sphere becomes a fallback; existing pointer/fact interaction retained.
Project content, Hitachi Digital correction, company marks and all career details
unchanged. Native scrolling and prior routes retained. No new standalone journey route.
No framework migration or R3F/GSAP installation. Original yarn.lock retained as legacy;
npm/package-lock remains the supported dependency path.

### Verification
Production build passed with the same three inherited warnings. WebGL lifecycle,
atlas navigation and mode interaction tests added; final results recorded below.

Final verification: 13/13 tests across three suites passed. Production build passed
(three pre-existing legacy warnings). `git diff --check` passed; biography, experience
and project data have no changes in this iteration. WebGL lifecycle tests mock the
renderer boundary: they do not establish actual GPU rendering correctness. Managed
preview retry failed again at browser relay port 4173 readiness; visual/device QA,
FPS and thermal/battery measurements remain pending. No merge or deployment.

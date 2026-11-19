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

# Portfolio journey — start here

Updated: 2026-11-19. Working branch: `codex/portfolio-motion-redesign`.
Base: `a618228`. Goal: cinematic, responsive portfolio, unchanged personal content,
optional puzzle and AI links, low-overhead context for future edits. No production merge.

## Read only what you need
- Experience/content changes: `src/data/*Data.js` (source of truth).
- Layout/interaction: `src/pages/Journey/Journey.jsx`.
- Visuals/responsiveness/motion: `src/pages/Journey/Journey.css`.
- Behaviour regression coverage: `src/pages/Journey/Journey.test.jsx`.
- Route wiring: `src/App.js`; `/` = journey, `/v2` = previous homepage,
  `/v1`, `/projects`, `/blog` retained.
- Detailed decisions, research, cuts and checks: `docs/IMPLEMENTATION_LOG.md`.

## Constraints to retain
Keep biography, career highlights, project descriptions/links,
education entry, service and contact/social link. Never invent new career claims.
V2 hero roles and expanded tech list are preserved in the toolkit disclosure.
CV uses the same Google Drive link as V2. Source claims are inherited, not independently verified.
External project deployments may have aged; don't silently replace their URLs.
Do not merge/publish production when working on this review branch.

## Architecture
React 17 / CRA 4 retained; no new runtime dependencies. CSS `preserve-3d` orbital
sculpture uses 16 rings. No video, WebGL engine or scroll hijacking. Pointer tilt uses event-driven rAF.
IntersectionObserver handles entry reveals and active chapter (no per-frame React state).
Native CSS view timeline adds portrait drift where supported. Pause control + OS
reduced-motion + hidden-tab/offscreen pausing. All content works without those effects.
Native details expose long experience lists; filters use original project tags.
Signal puzzle uses a deterministic solvable 3×3 board and native accessible buttons.
Contact uses mailto/tel and copy; no mail backend, API key or false sent confirmation.

## Next-session recipe
1. Read this file, then `git status` and the last validation/log entry.
2. Open only the component/data files relevant to the request.
3. Make changes and run scoped tests plus production build when appropriate.
4. Append a concise log entry (why, files, removals, evidence, limitations).
5. Refresh this summary if architecture/routes/constraints change; keep it short.

## Current verification / known limits
Seven React/Jest behaviour tests cover content, puzzle, filtering, menu and motion.
Production build passes with inherited legacy-component warnings. Browser QA blocked
by managed preview relay timeout; no device/FPS/Lighthouse claims. npm Babel override
fixes inherited test-tool incompatibility. `scripts/preview.cjs` adapts CRA to preview
flags. `AGENTS.md` points future work here. See final log entry for exact checks.

## Latest additions
Current employer corrected to Hitachi Digital by the user (bio, experience and hero).
`InteractiveSphere.jsx` owns sphere tilt and dismissible random-fact portal.
`src/data/sphereFacts.js` is the editable fact feed; cite researched claims.
`src/data/careerChapters.js` maps experience IDs to brand visuals; update it for new jobs.
Original local company marks and provenance: `public/brands/SOURCES.md`.
Facts link into the existing homepage journey; no separate journey route yet.

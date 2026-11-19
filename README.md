# Developer Portfolio

React-based personal portfolio website.

## Requirements
- Node.js 22.x
- npm

## Install dependencies
```bash
npm install
```

## Run development server
```bash
npm start
```

## Run tests
```bash
npm test -- --watchAll=false
```

## Build for production
```bash
npm run build
```

The project uses `.npmrc` with `legacy-peer-deps=true` to resolve peer dependency conflicts during installation.

## Cinematic journey branch

The new homepage is `/`. Previous designs remain at `/v2` and `/v1`.
Start future work with [the concise context map](docs/JOURNEY_CONTEXT.md), then
[the implementation log](docs/IMPLEMENTATION_LOG.md). Personal content lives in
`src/data/`; update it there rather than duplicating biography or project data.

Use **npm** and the committed `package-lock.json` for reproducible installs:
`npm ci`. The Babel override repairs an incompatibility in the inherited CRA 4
build/test toolchain. `yarn.lock` is retained only as a legacy artifact.

`npm run dev -- --host 127.0.0.1 --port 4173` supports preview tools that pass
host/port flags. `npm start` remains the normal local development command.

The contact action opens the visitor's email client; no email backend is configured.
The optional puzzle and AI shelf need no credentials. Motion can be disabled in
navigation and automatically respects the operating system's reduced-motion setting.

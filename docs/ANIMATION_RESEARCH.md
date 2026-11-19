# Open-source animation research

Researched 2026-11-19 for the portfolio journey branch. These are design/architecture
references, not copied portfolio templates. All new scene/layout code is original;
no source-demo images, car models, text or physics systems were imported.

| Reference | License checked | What informed this portfolio |
| --- | --- | --- |
| [Bruno Simon / folio-2019](https://github.com/brunosimon/folio-2019) | [MIT](https://github.com/brunosimon/folio-2019/blob/master/license.md) | Spatial exploration and destinations. Adapted the idea into a keyboard-accessible chapter atlas, rather than copying the car world. Inspected Application.js: renderer/camera/world separation and touch configuration. |
| [Codrops / Scroll3DGrid](https://github.com/codrops/Scroll3DGrid) | [MIT](https://github.com/codrops/Scroll3DGrid/blob/main/LICENSE) | Perspective image arrangements. Applied restrained native scroll-driven rotation/depth to existing project cards; their real content remains reachable. |
| [Codrops / 3DStackMotion](https://github.com/codrops/3DStackMotion) | [MIT](https://github.com/codrops/3DStackMotion/blob/main/LICENSE) | Read index.js and effect-1/stackMotionEffect.js. Their transform-based depth sequencing informed our gallery arrival; no GSAP code or bundled assets copied. |
| [pmndrs / React Three Fiber](https://github.com/pmndrs/react-three-fiber) | MIT, GitHub repository metadata | Read [scaling performance](https://github.com/pmndrs/react-three-fiber/blob/master/docs/advanced/scaling-performance.mdx). Applied conditional rendering, bounded draw calls, resource disposal and progressive quality. R3F itself is not installed. |
| [Three.js](https://github.com/mrdoob/three.js) | MIT, installed package LICENSE copied to public/licenses/three-MIT.txt | Actual runtime dependency for the procedural WebGL orb. |

## Chosen visual direction

An engineering observatory: a particle sphere with orbital arcs and an abstract
faceted core, a field of distant points, and a navigable constellation of chapters.
Three selectable scenes (Orbit / Constellation / Signal) share geometry and switch
visibility, colour and scale. Pointer tilt and fact discovery remain available.

The chapter atlas links to biography, career, projects, playground and contact.
It is an alternative route through existing content, not a replacement navigation
system or a fullscreen game the visitor must complete.

## Technical limits and tradeoffs

- Three.js 0.132.2 is pinned for the inherited CRA 4 / Webpack 4 toolchain. This is
  deliberately a compatibility release, not the latest Three.js. Upgrade alongside
  a planned bundler/framework migration rather than importing current R3F into React 17.
- The WebGL dependency is a separate ~129 KB gzip chunk in this build, plus the small
  scene module. It is requested when the sphere is visible, WebGL is exposed and
  motion/data-saving preferences permit it. Ordinary content does not await it.
- One canvas; no GLB downloads, textures, physics, shadow maps or postprocessing.
- 600 sphere points below 760px; 1,400 otherwise, plus 240 background points.
  Pixel ratio capped at 1.5. Animation target capped at 30fps, not a measured FPS claim.
- Stop rendering when out of view/hidden. Dispose geometry, materials, observers,
  listeners, frame requests and context on teardown. Motion-off skips WebGL entirely.
- CSS fallback remains for initialization failure, context loss, reduced motion and
  Save-Data. All modes and fact buttons remain functional without WebGL.
- Gallery depth and reading progress use native scroll timelines only where supported.
  Other browsers retain the standard responsive gallery. No scroll hijacking.
- Browser preview relay is not working in this environment; visual correctness,
  real-device thermal/battery cost and frame pacing need browser/device review.

## Not adopted

Bruno's car/physics system, full-screen pinned scrolling, bloom, loading gates,
large model packs, source-demo images, custom cursors and autoplay audio. Those
would add weight or interfere with reading this particular portfolio.

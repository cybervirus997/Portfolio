// Original procedural scene. Three.js is MIT; see public/licenses/three-MIT.txt.
import * as THREE from "three";

export function createOrbitalScene(canvas, { onFailure, mode = "orbit" }) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
  camera.position.z = 8.1;
  const world = new THREE.Group();
  scene.add(world);
  const objects = [];
  const add = (object) => {
    world.add(object);
    objects.push(object);
    return object;
  };
  const count = window.innerWidth < 760 ? 600 : 1400;
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    positions[i * 3] = Math.cos(golden * i) * r * 1.65;
    positions[i * 3 + 1] = y * 1.65;
    positions[i * 3 + 2] = Math.sin(golden * i) * r * 1.65;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );
  const particles = add(
    new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xd4fa67,
        size: 0.025,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      }),
    ),
  );
  const shell = add(
    new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.35, 1),
      new THREE.MeshBasicMaterial({
        color: 0xb3d85b,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      }),
    ),
  );
  const core = add(
    new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.55, 1),
      new THREE.MeshNormalMaterial({ flatShading: true }),
    ),
  );
  const arcs = [];
  for (let i = 0; i < 3; i++) {
    const arc = add(
      new THREE.Mesh(
        new THREE.TorusGeometry(2 + i * 0.15, 0.008, 5, 100, Math.PI * 1.7),
        new THREE.MeshBasicMaterial({
          color: i === 1 ? 0x80d9e0 : 0xd4fa67,
          transparent: true,
          opacity: 0.65,
        }),
      ),
    );
    arc.rotation.set(0.6 + i * 0.6, i * 0.7, i);
    arcs.push(arc);
  }
  const starsArray = new Float32Array(240 * 3);
  for (let i = 0; i < 240; i++) {
    starsArray[i * 3] = Math.sin(i * 21.3) * 5;
    starsArray[i * 3 + 1] = Math.cos(i * 17.2) * 5;
    starsArray[i * 3 + 2] = -2 - (i % 6);
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(starsArray, 3),
  );
  const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({
      color: 0x9cae86,
      size: 0.022,
      transparent: true,
      opacity: 0.5,
    }),
  );
  scene.add(stars);
  let disposed = false,
    visible = true,
    frame = 0,
    last = 0,
    elapsed = 0;
  function applyMode(next) {
    mode = next;
    arcs.forEach((a) => {
      a.visible = mode !== "constellation";
    });
    core.visible = mode === "orbit";
    shell.visible = mode !== "constellation";
    particles.material.color.set(mode === "signal" ? 0x80d9e0 : 0xd4fa67);
    particles.material.size = mode === "constellation" ? 0.043 : 0.025;
  }
  applyMode(mode);
  function draw(time) {
    if (disposed || !visible || document.hidden) return;
    frame = requestAnimationFrame(draw);
    if (time - last < 1000 / 30) return;
    elapsed += Math.min((time - last) / 1000, 0.05);
    last = time;
    world.rotation.y = elapsed * 0.12;
    world.rotation.z = Math.sin(elapsed * 0.2) * 0.12;
    core.rotation.x = elapsed * 0.4;
    core.rotation.z = elapsed * 0.2;
    shell.rotation.y = -elapsed * 0.16;
    arcs.forEach((arc, i) => {
      arc.rotation.z = elapsed * (i % 2 ? -0.12 : 0.12) + i;
    });
    const scale =
      mode === "signal"
        ? 1 + Math.sin(elapsed * 1.6) * 0.12
        : mode === "constellation"
          ? 1.25
          : 1;
    particles.scale.setScalar(scale);
    renderer.render(scene, camera);
  }
  function resume() {
    cancelAnimationFrame(frame);
    if (!disposed && visible && !document.hidden) {
      last = performance.now();
      frame = requestAnimationFrame(draw);
    }
  }
  function resize() {
    if (disposed) return;
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false);
    camera.aspect = rect.width / Math.max(1, rect.height);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }
  const observer = window.IntersectionObserver
    ? new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        resume();
      })
    : null;
  observer?.observe(canvas);
  const resizer = window.ResizeObserver ? new ResizeObserver(resize) : null;
  resizer?.observe(canvas);
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", resume);
  const lost = (event) => {
    event.preventDefault();
    onFailure();
  };
  canvas.addEventListener("webglcontextlost", lost);
  resize();
  resume();
  return {
    setMode: applyMode,
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      resizer?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", resume);
      canvas.removeEventListener("webglcontextlost", lost);
      [...objects, stars].forEach((o) => {
        o.geometry.dispose();
        o.material.dispose();
      });
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}

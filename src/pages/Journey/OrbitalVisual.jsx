import React, { useEffect, useRef, useState } from "react";

export default function OrbitalVisual({ paused, mode }) {
  const canvas = useRef(null);
  const engine = useRef(null);
  const [ready, setReady] = useState(false);
  const latestMode = useRef(mode);
  latestMode.current = mode;
  useEffect(() => {
    let cancelled = false;
    let observer;
    let started = false;
    setReady(false);
    // Keep the CSS scene for reduced motion, data saving, and unavailable WebGL.
    if (
      paused ||
      navigator.connection?.saveData ||
      !window.WebGLRenderingContext
    )
      return undefined;
    const start = () => {
      if (started || cancelled) return;
      started = true;
      import("./orbitalEngine")
        .then(({ createOrbitalScene }) => {
          if (cancelled) return;
          try {
            engine.current = createOrbitalScene(canvas.current, {
              mode: latestMode.current,
              onFailure: () => {
                engine.current?.dispose();
                engine.current = null;
                setReady(false);
              },
            });
            setReady(true);
          } catch {
            setReady(false);
          }
        })
        .catch(() => {
          if (!cancelled) setReady(false);
        });
    };
    if (window.IntersectionObserver) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          start();
          observer.disconnect();
        }
      });
      observer.observe(canvas.current);
    } else start();
    return () => {
      cancelled = true;
      observer?.disconnect();
      engine.current?.dispose();
      engine.current = null;
    };
  }, [paused]);
  useEffect(() => {
    engine.current?.setMode(mode);
  }, [mode]);
  return (
    <span
      className={`j-orbital-visual mode-${mode} ${ready ? "webgl-ready" : ""}`}
    >
      <canvas className="j-webgl-orb" ref={canvas} aria-hidden="true" />
      <span className="j-sculpture j-orb-fallback">
        {Array.from({ length: 16 }, (_, i) => (
          <span className="j-ring" key={i} style={{ "--ring": i }} />
        ))}
        <span className="j-core" />
      </span>
    </span>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { sphereFacts, nextFactIndex } from "../../data/sphereFacts";

export default function InteractiveSphere({ paused }) {
  const [current, setCurrent] = useState(-1);
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const tilt = useRef(null);
  const frame = useRef(null);
  const fact = sphereFacts[current];
  function discover() {
    setCurrent((index) => nextFactIndex(sphereFacts.length, index));
    setOpen(true);
  }
  function close(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) trigger.current?.focus({ preventScroll: true });
  }
  useEffect(() => {
    if (!open) return undefined;
    const escape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  useEffect(() => {
    if (paused && tilt.current) tilt.current.style.transform = "";
    return () => cancelAnimationFrame(frame.current);
  }, [paused]);
  function lean(event) {
    if (paused || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 22;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -22;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (tilt.current)
        tilt.current.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
  }
  function reset() {
    cancelAnimationFrame(frame.current);
    if (tilt.current) tilt.current.style.transform = "";
  }
  return (
    <>
      <div className="j-orbit-scene">
        <div className="j-orbit-grid" aria-hidden="true" />
        <div className="j-orbit-halo" aria-hidden="true" />
        <button
          className="j-sphere-trigger"
          ref={trigger}
          onClick={discover}
          onPointerMove={lean}
          onPointerLeave={reset}
          onBlur={reset}
          aria-label="Explore the sphere: discover a random fact"
          aria-controls={open ? "sphere-discovery" : undefined}
          aria-expanded={open}
        >
          <span className="j-orbit-tilt" ref={tilt} aria-hidden="true">
            <span className="j-sculpture">
              {Array.from({ length: 16 }, (_, i) => (
                <span className="j-ring" key={i} style={{ "--ring": i }} />
              ))}
              <span className="j-core" />
            </span>
          </span>
          <span className="j-sphere-prompt">
            Touch a little curiosity <span aria-hidden="true">＋</span>
          </span>
        </button>
        <div className="j-coordinate coord-a" aria-hidden="true">
          CRAFT × INTELLIGENCE
        </div>
        <div className="j-coordinate coord-b" aria-hidden="true">
          CLICK · DISCOVER · EXPLORE
        </div>
        <span className="j-orbit-dot dot-a" aria-hidden="true" />
        <span className="j-orbit-dot dot-b" aria-hidden="true" />
      </div>
      {open &&
        fact &&
        createPortal(
          <aside
            className={`j-discovery ${paused ? "is-still" : ""}`}
            id="sphere-discovery"
            aria-label="Sphere discovery"
          >
            <div className="j-discovery-top">
              <span>{fact.category}</span>
              <button aria-label="Dismiss fact" onClick={() => close(true)}>
                ×
              </button>
            </div>
            <div role="status" aria-live="polite" aria-atomic="true">
              <h3>{fact.title}</h3>
              <p>{fact.text}</p>
            </div>
            <div className="j-discovery-actions">
              <a
                href={fact.href}
                {...(fact.href.startsWith("https:")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                onClick={() => {
                  if (fact.href.startsWith("#")) close();
                }}
              >
                {fact.source}
              </a>
              <button onClick={discover}>Another fact</button>
            </div>
          </aside>,
          document.body,
        )}
    </>
  );
}

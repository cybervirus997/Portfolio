import React, { useState } from "react";
export const destinations = [
  {
    id: "about",
    name: "The human",
    symbol: "◎",
    title: "Meet the mind behind the work.",
    text: "The craft, curiosity and experience that shape how I build.",
    x: "23%",
    y: "25%",
  },
  {
    id: "experience",
    name: "The journey",
    symbol: "⌘",
    title: "Follow the engineering journey.",
    text: "From embedded systems to real-time trading and AI-powered experiences.",
    x: "73%",
    y: "22%",
  },
  {
    id: "work",
    name: "The projects",
    symbol: "◈",
    title: "Explore ideas made real.",
    text: "Six projects. Different challenges. The same curiosity to make things work.",
    x: "83%",
    y: "60%",
  },
  {
    id: "playground",
    name: "The playground",
    symbol: "✳",
    title: "Take a detour into curiosity.",
    text: "A signal puzzle and a collection of AI tools to keep exploring.",
    x: "48%",
    y: "84%",
  },
  {
    id: "contact",
    name: "Your next idea",
    symbol: "＋",
    title: "Start the next chapter together.",
    text: "A role, a project, a conversation. Every collaboration begins somewhere.",
    x: "16%",
    y: "65%",
  },
];
export default function JourneyAtlas() {
  const [selected, setSelected] = useState(0);
  const destination = destinations[selected];
  return (
    <section id="atlas" className="j-section j-atlas">
      <div className="j-atlas-intro" data-enter>
        <div className="j-label">An open world of ideas</div>
        <h2>
          Find your
          <br />
          <em>own orbit.</em>
        </h2>
        <p>
          There’s more than one way through this story.
          <br />
          Choose a world. Follow your curiosity.
        </p>
      </div>
      <div className="j-atlas-layout">
        <div
          className="j-star-map"
          role="group"
          aria-label="Choose a chapter to explore"
        >
          <div className="j-map-orbits" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="j-map-core" aria-hidden="true">
            sp<span>THE CREATIVE CORE</span>
          </div>
          {destinations.map((item, i) => (
            <button
              key={item.id}
              style={{ "--node-x": item.x, "--node-y": item.y }}
              aria-pressed={selected === i}
              aria-controls="atlas-preview"
              onClick={() => setSelected(i)}
              className="j-map-node"
            >
              <span aria-hidden="true">{item.symbol}</span>
              <strong>{item.name}</strong>
            </button>
          ))}
        </div>
        <div className="j-atlas-preview" id="atlas-preview">
          <span className="j-atlas-symbol" aria-hidden="true">
            {destination.symbol}
          </span>
          <div aria-live="polite" aria-atomic="true">
            <div className="j-label">{destination.name}</div>
            <h3>{destination.title}</h3>
            <p>{destination.text}</p>
          </div>
          <a href={`#${destination.id}`} className="j-btn">
            Enter this chapter <span aria-hidden="true">＋</span>
          </a>
          <span className="j-atlas-note">
            Or keep scrolling to see the full story.
          </span>
        </div>
      </div>
    </section>
  );
}

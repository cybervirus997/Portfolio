// Add facts here; keep IDs unique and cite externally researched claims.
// Internal links connect discoveries to the portfolio's existing chapters.
export const sphereFacts = [
  {
    id: "origins",
    category: "The journey",
    title: "It started with electronics.",
    text: "Before real-time trading and AI interfaces, my journey included electronics studies and IoT research at ECIL.",
    href: "#experience",
    source: "Explore the journey",
  },
  {
    id: "craft",
    category: "Behind the work",
    title: "Small details. Large scale.",
    text: "My trading-platform work included reducing frame drops by about 60% and memory footprint by about 35%.",
    href: "#experience",
    source: "Read the original career details",
  },
  {
    id: "sharekaro",
    category: "From the archive",
    title: "An idea worth sharing.",
    text: "ShareKaro is my awarded hackathon project built around shared transportation.",
    href: "#work",
    source: "Explore the projects",
  },
  {
    id: "sun",
    category: "A little cosmic perspective",
    title: "A star with no solid surface.",
    text: "The Sun is made of plasma. Its equator and poles rotate at different speeds.",
    href: "https://science.nasa.gov/sun/facts/",
    source: "Source: NASA Science",
  },
  {
    id: "websocket",
    category: "Engineering curiosity",
    title: "A conversation, not a refresh.",
    text: "WebSockets let a browser and server exchange messages in both directions without repeatedly polling for updates.",
    href: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
    source: "Source: MDN Web Docs",
  },
  {
    id: "beyond",
    category: "Beyond code",
    title: "Curiosity has more than one medium.",
    text: "Electronic bots, photography and video editing are part of my world, too.",
    href: "#foundations",
    source: "Explore beyond code",
  },
];

export function nextFactIndex(length, current, random = Math.random()) {
  if (length < 1) return -1;
  if (length === 1) return 0;
  const available = current >= 0 && current < length ? length - 1 : length;
  const choice = Math.min(
    available - 1,
    Math.floor(Math.max(0, random) * available),
  );
  return current >= 0 && choice >= current ? choice + 1 : choice;
}

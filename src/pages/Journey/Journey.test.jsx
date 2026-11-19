import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Journey, { toggleLights } from "./Journey";
import { projectsData } from "../../data/projectsData";
import { experienceData } from "../../data/experienceData";
import { aboutData } from "../../data/aboutData";

beforeAll(() => {
  window.matchMedia = () => ({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
});
let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  act(() => {
    ReactDOM.unmountComponentAtNode(container);
  });
  container.remove();
});
function render() {
  act(() => {
    ReactDOM.render(<Journey />, container);
  });
}
function click(element) {
  act(() => {
    element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

test("preserves all projects, career highlights and biography in accessible HTML", () => {
  render();
  expect(container.textContent).toContain(aboutData.description1);
  expect(container.textContent).toContain(aboutData.description2);
  projectsData.forEach((p) => {
    expect(container.textContent).toContain(p.projectName);
    expect(container.textContent).toContain(p.projectDesc);
    expect(container.querySelector(`a[href="${p.code}"]`)).not.toBeNull();
  });
  experienceData.forEach((e) => {
    expect(container.textContent).toContain(e.company);
    e.highlights.forEach((h) => expect(container.textContent).toContain(h));
  });
});

test("puzzle flips only direct neighbours, never wraps across a row", () => {
  const board = Array(9).fill(false);
  expect(toggleLights(board, 2)).toEqual([
    false,
    true,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
  ]);
  expect(board).toEqual(Array(9).fill(false));
  expect(toggleLights(toggleLights(board, 4), 4)).toEqual(board);
});

test("puzzle is solvable, announces completion and resets", () => {
  render();
  for (const node of [1, 3, 7, 9]) {
    click(container.querySelector(`[aria-label="Node ${node}, off"]`));
  }
  expect(container.textContent).toContain(
    "System online. Nicely done in 4 moves!",
  );
  expect(container.querySelectorAll(".j-puzzle button:disabled").length).toBe(
    9,
  );
  click(
    [...container.querySelectorAll("button")].find(
      (b) => b.textContent === "Reset puzzle",
    ),
  );
  expect(container.querySelectorAll(".j-puzzle button:disabled").length).toBe(
    0,
  );
  expect(container.textContent).toContain("0 moves · 5/9 nodes online");
});

test("filter and motion controls update without blocking content", () => {
  render();
  click(
    [...container.querySelectorAll(".j-filters button")].find(
      (b) => b.textContent === "React",
    ),
  );
  expect(container.querySelectorAll(".j-project").length).toBe(4);
  click(container.querySelector(".j-motion"));
  expect(
    container.querySelector(".journey").classList.contains("j-paused"),
  ).toBe(true);
  click(container.querySelector(".j-menu"));
  expect(container.querySelector(".j-menu").getAttribute("aria-expanded")).toBe(
    "true",
  );
  act(() => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  });
  expect(container.querySelector(".j-menu").getAttribute("aria-expanded")).toBe(
    "false",
  );
});

test("current employer is updated and each career chapter has a logo", () => {
  render();
  expect(container.textContent).toContain("Hitachi Digital");
  expect(container.textContent).not.toContain("GlobalLogic");
  expect(container.querySelectorAll(".j-company-logo img")).toHaveLength(4);
});

test("sphere discovers facts without immediate repeats and dismisses accessibly", () => {
  render();
  const sphere = container.querySelector(".j-sphere-trigger");
  click(sphere);
  const firstTitle = document.querySelector(".j-discovery h3").textContent;
  expect(sphere.getAttribute("aria-expanded")).toBe("true");
  click(document.querySelector(".j-discovery-actions button"));
  expect(document.querySelector(".j-discovery h3").textContent).not.toBe(
    firstTitle,
  );
  expect(
    document.querySelector(".j-discovery a").getAttribute("href"),
  ).toBeTruthy();
  act(() => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  });
  expect(document.querySelector(".j-discovery")).toBeNull();
  expect(document.activeElement).toBe(sphere);
  expect(sphere.getAttribute("aria-expanded")).toBe("false");
  click(container.querySelector(".j-motion"));
  click(sphere);
  expect(
    document.querySelector(".j-discovery").classList.contains("is-still"),
  ).toBe(true);
  click(document.querySelector('[aria-label="Dismiss fact"]'));
  expect(document.querySelector(".j-discovery")).toBeNull();
});

test('atlas destinations preview and link to real chapters', () => {
  render();
  const nodes = [...container.querySelectorAll('.j-map-node')];
  expect(nodes).toHaveLength(5);
  nodes.forEach(node => {
    click(node);
    expect(node.getAttribute('aria-pressed')).toBe('true');
    const href = container.querySelector('.j-atlas-preview a').getAttribute('href');
    expect(container.querySelector(href)).not.toBeNull();
  });
});

test('sphere appearances switch while fact discovery remains available', () => {
  render();
  const modes = [...container.querySelectorAll('.j-orbit-modes button')];
  modes.forEach(button => {
    click(button);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(container.querySelector('.j-orbital-visual').className).toContain(`mode-${button.textContent}`);
  });
  click(container.querySelector('.j-sphere-trigger'));
  expect(document.querySelector('.j-discovery h3')).not.toBeNull();
});

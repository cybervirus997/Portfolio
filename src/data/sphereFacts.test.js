import { nextFactIndex, sphereFacts } from "./sphereFacts";
test("random selection handles an empty feed, one fact and every previous index", () => {
  expect(nextFactIndex(0, -1)).toBe(-1);
  expect(nextFactIndex(1, 0)).toBe(0);
  for (let previous = -1; previous < sphereFacts.length; previous++) {
    for (const random of [0, 0.25, 0.5, 0.75, 0.99999]) {
      const next = nextFactIndex(sphereFacts.length, previous, random);
      expect(next).toBeGreaterThanOrEqual(0);
      expect(next).toBeLessThan(sphereFacts.length);
      expect(next).not.toBe(previous);
    }
  }
  expect(new Set(sphereFacts.map((f) => f.id)).size).toBe(sphereFacts.length);
});

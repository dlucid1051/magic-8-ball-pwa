import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getViewportOrientation,
} from "../../src/theme/ViewportOrientation";

describe("getViewportOrientation", () => {
  it("returns portrait when height is greater than width", () => {
    expect(
      getViewportOrientation(600, 900)
    ).toBe("portrait");
  });

  it("returns landscape when width is greater than height", () => {
    expect(
      getViewportOrientation(1200, 800)
    ).toBe("landscape");
  });

  it("treats a square viewport as landscape", () => {
    expect(
      getViewportOrientation(800, 800)
    ).toBe("landscape");
  });
});
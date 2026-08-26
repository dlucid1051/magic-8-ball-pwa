import { describe, expect, it } from "vitest";

import { StaticFramePosition } from "../../src/animation/StaticFramePosition";
import { getStaticFrameIndex } from "../../src/animation/getStaticFrameIndex";

describe("static frame positions", () => {
  it("maps the initial position to frame 1", () => {
    expect(
      getStaticFrameIndex(StaticFramePosition.INITIAL)
    ).toBe(1);
  });

  it("maps the final position to frame 25", () => {
    expect(
      getStaticFrameIndex(StaticFramePosition.FINAL)
    ).toBe(25);
  });
});
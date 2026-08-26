import { describe, expect, it } from "vitest";

import { getSpriteSheetPosition } from "../../src/animation/getSpriteSheetPosition.ts";

describe("getSpriteSheetPosition", () => {
  it("maps frame 1 to the first column of the first row", () => {
    expect(
      getSpriteSheetPosition(1)
    ).toEqual({
      row: 0,
      column: 0,
    });
  });

  it("maps frame 5 to the last column of the first row", () => {
    expect(
      getSpriteSheetPosition(5)
    ).toEqual({
      row: 0,
      column: 4,
    });
  });

  it("maps frame 6 to the first column of the second row", () => {
    expect(
      getSpriteSheetPosition(6)
    ).toEqual({
      row: 1,
      column: 0,
    });
  });

  it("maps frame 10 to the last column of the second row", () => {
    expect(
      getSpriteSheetPosition(10)
    ).toEqual({
      row: 1,
      column: 4,
    });
  });

  it("maps frame 11 to the first column of the third row", () => {
    expect(
      getSpriteSheetPosition(11)
    ).toEqual({
      row: 2,
      column: 0,
    });
  });

  it("maps frame 25 to the last column of the fifth row", () => {
    expect(
      getSpriteSheetPosition(25)
    ).toEqual({
      row: 4,
      column: 4,
    });
  });
});
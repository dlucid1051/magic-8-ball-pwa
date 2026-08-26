import { describe, expect, it } from "vitest";

import { AppState } from "../../src/app/AppState";
import { AnimationDisplayMode } from "../../src/animation/AnimationDisplayMode";
import { getAnimationDisplayMode } from "../../src/animation/getAnimationDisplayMode";

describe("animation display mode", () => {
  it("uses the initial static frame while idle", () => {
    expect(
      getAnimationDisplayMode(AppState.IDLE)
    ).toBe(AnimationDisplayMode.INITIAL_STATIC);
  });

  it("uses the initial static frame while preparing", () => {
    expect(
      getAnimationDisplayMode(AppState.PREPARING)
    ).toBe(AnimationDisplayMode.INITIAL_STATIC);
  });

  it("uses sprite animation while shaking", () => {
    expect(
      getAnimationDisplayMode(AppState.SHAKING)
    ).toBe(AnimationDisplayMode.SPRITE_ANIMATION);
  });

  it("uses the final static frame while revealing", () => {
    expect(
      getAnimationDisplayMode(AppState.REVEALING)
    ).toBe(AnimationDisplayMode.FINAL_STATIC);
  });

  it("uses the final static frame when the answer is visible", () => {
    expect(
      getAnimationDisplayMode(AppState.ANSWER_VISIBLE)
    ).toBe(AnimationDisplayMode.FINAL_STATIC);
  });

  it("falls back to the initial static frame in the error state", () => {
    expect(
      getAnimationDisplayMode(AppState.ERROR)
    ).toBe(AnimationDisplayMode.INITIAL_STATIC);
  });
});
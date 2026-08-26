import { describe, expect, it } from "vitest";

import type { AnimationAssets } from "../../src/animation/AnimationAssets";
import { AnimationDisplayMode } from "../../src/animation/AnimationDisplayMode";
import { selectAnimationAsset } from "../../src/animation/AnimationAssetSelection";

const assets: AnimationAssets = {
  frame01HighRes: "/theme/frame-01.webp",
  spriteSheet: "/theme/shake.webp",
  frame25HighRes: "/theme/frame-25.webp",
};

describe("animation asset selection", () => {
  it("selects high-resolution frame 01 for the initial static mode", () => {
    const selection = selectAnimationAsset(
      AnimationDisplayMode.INITIAL_STATIC,
      assets
    );

    expect(selection.mode).toBe(
      AnimationDisplayMode.INITIAL_STATIC
    );

    expect(selection.asset).toBe(
      assets.frame01HighRes
    );
  });

  it("selects the sprite sheet for animation", () => {
    const selection = selectAnimationAsset(
      AnimationDisplayMode.SPRITE_ANIMATION,
      assets
    );

    expect(selection.mode).toBe(
      AnimationDisplayMode.SPRITE_ANIMATION
    );

    expect(selection.asset).toBe(
      assets.spriteSheet
    );
  });

  it("selects high-resolution frame 25 for the final static mode", () => {
    const selection = selectAnimationAsset(
      AnimationDisplayMode.FINAL_STATIC,
      assets
    );

    expect(selection.mode).toBe(
      AnimationDisplayMode.FINAL_STATIC
    );

    expect(selection.asset).toBe(
      assets.frame25HighRes
    );
  });
});
import { describe, expect, it } from "vitest";

import type { AnimationAssets } from "../../src/animation/AnimationAssets";
import type { AnimationAssetResolver } from "../../src/animation/AnimationAssetResolver";

describe("animation asset contract", () => {
  it("supports the required animation assets", () => {
    const assets: AnimationAssets = {
      frame01HighRes: "/themes/sample/frame-01.webp",
      spriteSheet: "/themes/sample/shake.webp",
      frame25HighRes: "/themes/sample/frame-25.webp",
    };

    expect(assets.frame01HighRes).toContain("frame-01");
    expect(assets.spriteSheet).toContain("shake");
    expect(assets.frame25HighRes).toContain("frame-25");
  });

  it("allows a theme asset resolver to provide animation assets", () => {
    const resolver: AnimationAssetResolver = {
      resolveAnimationAssets() {
        return {
          frame01HighRes: "/themes/sample/frame-01.webp",
          spriteSheet: "/themes/sample/shake.webp",
          frame25HighRes: "/themes/sample/frame-25.webp",
        };
      },
    };

    expect(
      resolver.resolveAnimationAssets().frame01HighRes
    ).toBe("/themes/sample/frame-01.webp");
  });
});
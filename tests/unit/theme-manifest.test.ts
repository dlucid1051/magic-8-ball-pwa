import { describe, expect, it } from "vitest";

import type { ThemeManifest } from "../../src/theme/ThemeManifest";

describe("ThemeManifest", () => {
  it("supports the minimum theme manifest contract", () => {
    const manifest: ThemeManifest = {
      id: "sample-theme",
      name: "Sample Theme",
      version: "1.0.0",
      author: "Magic 8-Ball",
      description: "A minimal theme used for integration testing.",

      compatibility: {
        minAppVersion: "0.1.0",
      },

      assets: {
        animation: {
          frame01HighRes: "animation/frame-01.webp",
          spriteSheet: "animation/shake.webp",
          frame25HighRes: "animation/frame-25.webp",
        },

        visual: {
          backgroundPortrait: "visual/background-portrait.webp",
          backgroundLandscape: "visual/background-landscape.webp",
          hero: "visual/hero.webp",
        },
      },
    };

    expect(manifest.id).toBe("sample-theme");
    expect(manifest.name).toBe("Sample Theme");

    expect(
      manifest.assets.animation.frame01HighRes
    ).toBe("animation/frame-01.webp");

    expect(
      manifest.assets.animation.spriteSheet
    ).toBe("animation/shake.webp");

    expect(
      manifest.assets.animation.frame25HighRes
    ).toBe("animation/frame-25.webp");
  });
});
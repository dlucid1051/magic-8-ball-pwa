import {
  describe,
  expect,
  it,
} from "vitest";

import {
  validateThemeManifest,
} from "../../src/theme/ThemeManifestValidator";

const sampleTheme2Manifest = {
  id: "sample-theme-2",
  name: "Sample Theme 2",
  version: "1.0.0",
  author: "Magic 8-Ball",
  description:
    "A second sample theme used to validate theme-pack loading and switching.",
  thumbnail: "visual/hero.webp",

  compatibility: {
    minAppVersion: "0.1.0",
  },

  assets: {
    animation: {
      frame01HighRes:
        "animation/frame-01-high.webp",
      spriteSheet:
        "animation/shake.webp",
      frame25HighRes:
        "animation/frame-25-high.webp",
    },

    visual: {
      backgroundPortrait:
        "visual/background-portrait.webp",
      backgroundLandscape:
        "visual/background-landscape.webp",
      hero:
        "visual/hero.webp",
    },
  },
};

describe("sample theme 2 package", () => {
  it("defines a valid theme manifest", () => {
    const result =
      validateThemeManifest(
        sampleTheme2Manifest
      );

    expect(result.valid).toBe(true);

    if (result.valid) {
      expect(result.manifest.id).toBe(
        "sample-theme-2"
      );

      expect(result.manifest.name).toBe(
        "Sample Theme 2"
      );

      expect(result.manifest.thumbnail).toBe(
        "visual/hero.webp"
      );

      expect(
        result.manifest.assets.animation.frame01HighRes
      ).toBe(
        "animation/frame-01-high.webp"
      );

      expect(
        result.manifest.assets.animation.spriteSheet
      ).toBe(
        "animation/shake.webp"
      );

      expect(
        result.manifest.assets.animation.frame25HighRes
      ).toBe(
        "animation/frame-25-high.webp"
      );

      expect(
        result.manifest.assets.visual.backgroundPortrait
      ).toBe(
        "visual/background-portrait.webp"
      );

      expect(
        result.manifest.assets.visual.backgroundLandscape
      ).toBe(
        "visual/background-landscape.webp"
      );

      expect(
        result.manifest.assets.visual.hero
      ).toBe(
        "visual/hero.webp"
      );
    }
  });
});
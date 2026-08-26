import { describe, expect, it } from "vitest";

import {
  validateThemeManifest,
} from "../../src/theme/ThemeManifestValidator";

const sampleThemeManifest = {
  id: "sample-theme",
  name: "Sample Theme",
  version: "1.0.0",
  author: "Magic 8-Ball",
  description: "A minimal external theme used to validate the theme-pack architecture.",
  thumbnail: "visual/hero.webp",

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
      backgroundPortrait:
        "visual/background-portrait.webp",
      backgroundLandscape:
        "visual/background-landscape.webp",
      hero: "visual/hero.webp",
    },
  },
};

describe("sample theme package", () => {
  it("defines a valid theme manifest", () => {
    const result = validateThemeManifest(
      sampleThemeManifest
    );

    expect(result.valid).toBe(true);

    if (result.valid) {
      expect(result.manifest.id).toBe(
        "sample-theme"
      );

      expect(result.manifest.name).toBe(
        "Sample Theme"
      );

      expect(result.manifest.thumbnail).toBe(
        "visual/hero.webp"
      );

      expect(
        result.manifest.assets.animation.frame01HighRes
      ).toBe("animation/frame-01.webp");

      expect(
        result.manifest.assets.animation.spriteSheet
      ).toBe("animation/shake.webp");

      expect(
        result.manifest.assets.animation.frame25HighRes
      ).toBe("animation/frame-25.webp");
    }
  });
});
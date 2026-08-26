import {
  describe,
  expect,
  it,
} from "vitest";

import type { Theme } from "../../src/theme/Theme";

import {
  ThemeVisualAssetResolver,
} from "../../src/theme/ThemeVisualAssetResolver";

function createTheme(): Theme {
  return {
    manifest: {
      id: "sample-theme",
      name: "Sample Theme",
      version: "1.0.0",
      author: "Magic 8-Ball",
      description: "A sample theme.",

      compatibility: {
        minAppVersion: "0.1.0",
      },

      assets: {
        animation: {
          frame01HighRes:
            "animation/frame-01.webp",
          spriteSheet:
            "animation/shake.webp",
          frame25HighRes:
            "animation/frame-25.webp",
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
    },

    assets: {
      animation: {
        frame01HighRes:
          "/themes/sample-theme/animation/frame-01.webp",

        spriteSheet:
          "/themes/sample-theme/animation/shake.webp",

        frame25HighRes:
          "/themes/sample-theme/animation/frame-25.webp",
      },

      visual: {
        backgroundPortrait:
          "/themes/sample-theme/visual/background-portrait.webp",

        backgroundLandscape:
          "/themes/sample-theme/visual/background-landscape.webp",

        hero:
          "/themes/sample-theme/visual/hero.webp",
      },
    },
  };
}

describe(
  "ThemeVisualAssetResolver",
  () => {
    it("resolves visual assets from the theme", () => {
      const theme = createTheme();

      const resolver =
        new ThemeVisualAssetResolver(theme);

      expect(
        resolver.resolveVisualAssets()
      ).toEqual({
        backgroundPortrait:
          "/themes/sample-theme/visual/background-portrait.webp",

        backgroundLandscape:
          "/themes/sample-theme/visual/background-landscape.webp",

        hero:
          "/themes/sample-theme/visual/hero.webp",
      });
    });
  }
);
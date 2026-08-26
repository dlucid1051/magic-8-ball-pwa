import {
  describe,
  expect,
  it,
} from "vitest";

import {
  resolveThemeBackground,
} from "../../src/theme/ThemeBackgroundResolver";

import type {
  VisualAssets,
} from "../../src/theme/VisualAssets";

const visualAssets: VisualAssets = {
  backgroundPortrait:
    "/themes/sample-theme/visual/background-portrait.webp",

  backgroundLandscape:
    "/themes/sample-theme/visual/background-landscape.webp",

  hero:
    "/themes/sample-theme/visual/hero.webp",
};

describe("resolveThemeBackground", () => {
  it("returns the portrait background", () => {
    const result =
      resolveThemeBackground(
        visualAssets,
        "portrait"
      );

    expect(result).toBe(
      visualAssets.backgroundPortrait
    );
  });

  it("returns the landscape background", () => {
    const result =
      resolveThemeBackground(
        visualAssets,
        "landscape"
      );

    expect(result).toBe(
      visualAssets.backgroundLandscape
    );
  });
});
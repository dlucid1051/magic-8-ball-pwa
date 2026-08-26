import {
  describe,
  expect,
  it,
} from "vitest";

import {
  updateThemeBackground,
} from "../../src/theme/ThemeBackgroundRuntime";

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

function createImage(): HTMLImageElement {
  return {
    src: "",
    alt: "",
  } as HTMLImageElement;
}

describe("updateThemeBackground", () => {
  it("uses the portrait background", () => {
    const image = createImage();

    updateThemeBackground(
      image,
      visualAssets,
      600,
      900
    );

    expect(image.src).toBe(
      visualAssets.backgroundPortrait
    );

    expect(image.alt).toBe(
      "Theme portrait background"
    );
  });

  it("uses the landscape background", () => {
    const image = createImage();

    updateThemeBackground(
      image,
      visualAssets,
      1200,
      800
    );

    expect(image.src).toBe(
      visualAssets.backgroundLandscape
    );

    expect(image.alt).toBe(
      "Theme landscape background"
    );
  });

  it("uses the landscape background for a square viewport",() => {
      const image = createImage();

      updateThemeBackground(
        image,
        visualAssets,
        800,
        800
      );

      expect(image.src).toBe(
        visualAssets.backgroundLandscape
      );

      expect(image.alt).toBe(
        "Theme landscape background"
      );
    }
  );
});
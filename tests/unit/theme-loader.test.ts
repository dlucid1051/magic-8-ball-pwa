import { describe, expect, it } from "vitest";

import {
  loadTheme,
} from "../../src/theme/ThemeLoader";

const validManifest = {
  id: "sample-theme",
  name: "Sample Theme",
  version: "1.0.0",
  author: "Magic 8-Ball",
  description: "A sample theme.",
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

describe("loadTheme", () => {
  it("loads and resolves a valid theme", () => {
    const result = loadTheme(
      validManifest,
      "/themes/sample-theme/"
    );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.theme.manifest.id).toBe(
        "sample-theme"
      );

      expect(result.theme.thumbnail).toBe(
        "/themes/sample-theme/visual/hero.webp"
      );
      
      expect(
        result.theme.assets.animation.frame01HighRes
      ).toBe(
        "/themes/sample-theme/animation/frame-01.webp"
      );

      expect(
        result.theme.assets.animation.spriteSheet
      ).toBe(
        "/themes/sample-theme/animation/shake.webp"
      );

      expect(
        result.theme.assets.animation.frame25HighRes
      ).toBe(
        "/themes/sample-theme/animation/frame-25.webp"
      );
    }
  });

  it("loads and resolves sample theme 2 assets", () => {
    const result = loadTheme(
      sampleTheme2Manifest,
      "/themes/sample-theme-2/"
    );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.theme.manifest.id).toBe(
        "sample-theme-2"
      );

      expect(result.theme.thumbnail).toBe(
        "/themes/sample-theme-2/visual/hero.webp"
      );

      expect(
        result.theme.assets.animation.frame01HighRes
      ).toBe(
        "/themes/sample-theme-2/animation/frame-01-high.webp"
      );

      expect(
        result.theme.assets.animation.spriteSheet
      ).toBe(
        "/themes/sample-theme-2/animation/shake.webp"
      );

      expect(
        result.theme.assets.animation.frame25HighRes
      ).toBe(
        "/themes/sample-theme-2/animation/frame-25-high.webp"
      );

      expect(
        result.theme.assets.visual.backgroundPortrait
      ).toBe(
        "/themes/sample-theme-2/visual/background-portrait.webp"
      );

      expect(
        result.theme.assets.visual.backgroundLandscape
      ).toBe(
        "/themes/sample-theme-2/visual/background-landscape.webp"
      );

      expect(
        result.theme.assets.visual.hero
      ).toBe(
        "/themes/sample-theme-2/visual/hero.webp"
      );
    }
  });

  it("rejects an invalid manifest", () => {
    const result = loadTheme(
      {
        id: "",
      },
      "/themes/sample-theme/"
    );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toContain(
        "Manifest id is required."
      );
    }
  });

  it("handles a theme root without a trailing slash", () => {
    const result = loadTheme(
      validManifest,
      "/themes/sample-theme"
    );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(
        result.theme.assets.animation.spriteSheet
      ).toBe(
        "/themes/sample-theme/animation/shake.webp"
      );
    }
  });

    it("normalizes a leading slash in a manifest asset path", () => {
    const manifest = {
        ...validManifest,
        assets: {
        ...validManifest.assets,
        animation: {
            ...validManifest.assets.animation,
            spriteSheet: "/animation/shake.webp",
        },
        },
    };

    const result = loadTheme(
        manifest,
        "/themes/sample-theme/"
    );

    expect(result.success).toBe(true);

    if (result.success) {
        expect(
        result.theme.assets.animation.spriteSheet
        ).toBe(
        "/themes/sample-theme/animation/shake.webp"
        );
    }
  });
});
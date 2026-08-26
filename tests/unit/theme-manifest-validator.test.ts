import { describe, expect, it } from "vitest";

import {
  validateThemeManifest,
} from "../../src/theme/ThemeManifestValidator";

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

describe("validateThemeManifest", () => {
  it("accepts a valid manifest", () => {
    const result =
      validateThemeManifest(validManifest);

    expect(result.valid).toBe(true);

    if (result.valid) {
      expect(result.manifest.id).toBe(
        "sample-theme"
      );
    }
  });

  it("rejects a non-object manifest", () => {
    const result =
      validateThemeManifest(null);

    expect(result.valid).toBe(false);

    if (!result.valid) {
      expect(result.errors).toContain(
        "Manifest must be an object."
      );
    }
  });

  it("rejects a manifest missing its id", () => {
    const manifest = {
      ...validManifest,
      id: "",
    };

    const result =
      validateThemeManifest(manifest);

    expect(result.valid).toBe(false);

    if (!result.valid) {
      expect(result.errors).toContain(
        "Manifest id is required."
      );
    }
  });

  it("rejects a manifest missing its thumbnail", () => {
    const manifest = {
      ...validManifest,
      thumbnail: "",
    };

    const result =
      validateThemeManifest(manifest);

    expect(result.valid).toBe(false);

    if (!result.valid) {
      expect(result.errors).toContain(
        "Manifest thumbnail is required."
      );
    }
  });  

  it("rejects a manifest missing animation assets", () => {
    const manifest = {
      ...validManifest,
      assets: {
        ...validManifest.assets,
        animation: {
          ...validManifest.assets.animation,
          spriteSheet: "",
        },
      },
    };

    const result =
      validateThemeManifest(manifest);

    expect(result.valid).toBe(false);

    if (!result.valid) {
      expect(result.errors).toContain(
        "Animation spriteSheet is required."
      );
    }
  });

  it("rejects a manifest missing visual assets", () => {
    const manifest = {
      ...validManifest,
      assets: {
        ...validManifest.assets,
        visual: {
          ...validManifest.assets.visual,
          hero: "",
        },
      },
    };

    const result =
      validateThemeManifest(manifest);

    expect(result.valid).toBe(false);

    if (!result.valid) {
      expect(result.errors).toContain(
        "Visual hero is required."
      );
    }
  });
});
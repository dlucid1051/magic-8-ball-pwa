import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  loadThemePackage,
} from "../../src/theme/ThemePackageLoader";

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

describe("loadThemePackage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loads a valid theme package", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => validManifest,
    });

    vi.stubGlobal("fetch", fetchMock);

    const result =
      await loadThemePackage(
        "/themes/sample-theme/"
      );

    expect(fetchMock).toHaveBeenCalledWith(
      "/themes/sample-theme/manifest.json"
    );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.theme.manifest.id).toBe(
        "sample-theme"
      );

      expect(
        result.theme.assets.animation.spriteSheet
      ).toBe(
        "/themes/sample-theme/animation/shake.webp"
      );
    }
  });

  it("loads sample theme 2 package", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => sampleTheme2Manifest,
    });

    vi.stubGlobal("fetch", fetchMock);

    const result =
      await loadThemePackage(
        "/themes/sample-theme-2/"
      );

    expect(fetchMock).toHaveBeenCalledWith(
      "/themes/sample-theme-2/manifest.json"
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
        result.theme.assets.animation.frame25HighRes
      ).toBe(
        "/themes/sample-theme-2/animation/frame-25-high.webp"
      );

      expect(
        result.theme.assets.visual.hero
      ).toBe(
        "/themes/sample-theme-2/visual/hero.webp"
      );
    }
  });

  it("handles a missing manifest", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    vi.stubGlobal("fetch", fetchMock);

    const result =
      await loadThemePackage(
        "/themes/missing-theme/"
      );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toContain(
        "Failed to load theme manifest: 404 Not Found"
      );
    }
  });

  it("handles an invalid manifest", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "",
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const result =
      await loadThemePackage(
        "/themes/invalid-theme/"
      );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toContain(
        "Manifest id is required."
      );
    }
  });

  it("handles fetch errors", async () => {
    const fetchMock = vi.fn().mockRejectedValue(
      new Error("Network unavailable")
    );

    vi.stubGlobal("fetch", fetchMock);

    const result =
      await loadThemePackage(
        "/themes/sample-theme/"
      );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toContain(
        "Failed to load theme package: Network unavailable"
      );
    }
  });
});
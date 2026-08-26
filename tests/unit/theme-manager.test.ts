import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { ThemeManager } from "../../src/theme/ThemeManager";
import { ThemeRegistry } from "../../src/theme/ThemeRegistry";

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

describe("ThemeManager", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loads and activates a theme", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => validManifest,
    });

    vi.stubGlobal("fetch", fetchMock);

    const registry = new ThemeRegistry();
    const manager = new ThemeManager(registry);

    const result =
      await manager.loadAndActivate(
        "/themes/sample-theme/"
      );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.themeId).toBe(
        "sample-theme"
      );
    }

    expect(
      registry.getActiveTheme().manifest.id
    ).toBe("sample-theme");
  });

  it("loads and activates sample theme 2", async () => {
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

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => sampleTheme2Manifest,
    });

    vi.stubGlobal("fetch", fetchMock);

    const registry = new ThemeRegistry();
    const manager = new ThemeManager(registry);

    const result =
      await manager.loadAndActivate(
        "/themes/sample-theme-2/"
      );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.themeId).toBe(
        "sample-theme-2"
      );
    }

    expect(
      registry.getActiveTheme().manifest.id
    ).toBe("sample-theme-2");

    expect(
      registry.getActiveTheme().thumbnail
    ).toBe(
      "/themes/sample-theme-2/visual/hero.webp"
    );

    expect(
      registry.getActiveTheme()
        .assets.animation.frame01HighRes
    ).toBe(
      "/themes/sample-theme-2/animation/frame-01-high.webp"
    );

    expect(
      registry.getActiveTheme()
        .assets.animation.frame25HighRes
    ).toBe(
      "/themes/sample-theme-2/animation/frame-25-high.webp"
    );
  });
  
  it("does not activate a theme when loading fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    vi.stubGlobal("fetch", fetchMock);

    const registry = new ThemeRegistry();
    const manager = new ThemeManager(registry);

    const result =
      await manager.loadAndActivate(
        "/themes/missing-theme/"
      );

    expect(result.success).toBe(false);

    expect(() => {
      registry.getActiveTheme();
    }).toThrow(
      "No active theme is registered."
    );
  });

  it("switches the active theme from sample theme to sample theme 2", async () => {
    const sampleThemeManifest = {
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

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () =>
          sampleThemeManifest,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () =>
          sampleTheme2Manifest,
      });

    vi.stubGlobal("fetch", fetchMock);

    const registry = new ThemeRegistry();
    const manager = new ThemeManager(registry);

    const firstResult =
      await manager.loadAndActivate(
        "/themes/sample-theme/"
      );

    expect(firstResult.success).toBe(true);

    expect(
      registry.getActiveTheme().manifest.id
    ).toBe("sample-theme");

    const secondResult =
      await manager.loadAndActivate(
        "/themes/sample-theme-2/"
      );

    expect(secondResult.success).toBe(true);

    expect(
      registry.getActiveTheme().manifest.id
    ).toBe("sample-theme-2");

    expect(
      registry.getActiveTheme().thumbnail
    ).toBe(
      "/themes/sample-theme-2/visual/hero.webp"
    );

    expect(
      fetchMock
    ).toHaveBeenCalledWith(
      "/themes/sample-theme/manifest.json"
    );

    expect(
      fetchMock
    ).toHaveBeenCalledWith(
      "/themes/sample-theme-2/manifest.json"
    );
  });
});
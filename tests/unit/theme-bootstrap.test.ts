import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  bootstrapTheme,
} from "../../src/theme/ThemeBootstrap";

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
      hero: "visual/hero.webp",
    },
  },
};

describe("bootstrapTheme", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loads and activates the theme", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => validManifest,
    });

    vi.stubGlobal("fetch", fetchMock);

    const registry =
      await bootstrapTheme(
        "/themes/sample-theme/"
      );

    expect(
      registry.getActiveTheme().manifest.id
    ).toBe("sample-theme");
  });

  it("throws when the theme cannot be loaded", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(
      bootstrapTheme(
        "/themes/missing-theme/"
      )
    ).rejects.toThrow(
      "Failed to bootstrap theme: Failed to load theme manifest: 404 Not Found"
    );
  });
});
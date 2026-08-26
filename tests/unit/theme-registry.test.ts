import {
  describe,
  expect,
  it,
} from "vitest";

import { ThemeRegistry } from "../../src/theme/ThemeRegistry";
import type { Theme } from "../../src/theme/Theme";

function createTheme(
  id: string,
  name: string
): Theme {
  return {
    manifest: {
      id,
      name,
      version: "1.0.0",
      author: "Magic 8-Ball",
      description: `${name} test theme.`,

      compatibility: {
        minAppVersion: "0.1.0",
      },

      assets: {
        animation: {
          frame01HighRes:
            `/${id}/frame-01.webp`,
          spriteSheet:
            `/${id}/shake.webp`,
          frame25HighRes:
            `/${id}/frame-25.webp`,
        },

        visual: {
          backgroundPortrait:
            `/${id}/portrait.webp`,
          backgroundLandscape:
            `/${id}/landscape.webp`,
          hero:
            `/${id}/hero.webp`,
        },
      },
    },

    assets: {
      animation: {
        frame01HighRes:
          `/${id}/frame-01.webp`,
        spriteSheet:
          `/${id}/shake.webp`,
        frame25HighRes:
          `/${id}/frame-25.webp`,
      },

      visual: {
        backgroundPortrait:
          `/${id}/portrait.webp`,
        backgroundLandscape:
          `/${id}/landscape.webp`,
        hero:
          `/${id}/hero.webp`,
      },
    },
  };
}

describe("ThemeRegistry", () => {
  it("registers a theme", () => {
    const registry = new ThemeRegistry();
    const theme = createTheme(
      "sample-theme",
      "Sample Theme"
    );

    registry.register(theme);

    expect(
      registry.getTheme("sample-theme")
    ).toBe(theme);
  });

  it("makes the first registered theme active", () => {
    const registry = new ThemeRegistry();
    const theme = createTheme(
      "sample-theme",
      "Sample Theme"
    );

    registry.register(theme);

    expect(
      registry.getActiveTheme()
    ).toBe(theme);
  });

  it("can change the active theme", () => {
    const registry = new ThemeRegistry();

    const first = createTheme(
      "first-theme",
      "First Theme"
    );

    const second = createTheme(
      "second-theme",
      "Second Theme"
    );

    registry.register(first);
    registry.register(second);

    registry.setActiveTheme("second-theme");

    expect(
      registry.getActiveTheme()
    ).toBe(second);
  });

  it("rejects activation of an unknown theme", () => {
    const registry = new ThemeRegistry();

    expect(() => {
      registry.setActiveTheme(
        "missing-theme"
      );
    }).toThrow(
      'Cannot activate unknown theme "missing-theme".'
    );
  });

  it("removes a theme", () => {
    const registry = new ThemeRegistry();

    const theme = createTheme(
      "sample-theme",
      "Sample Theme"
    );

    registry.register(theme);

    expect(
      registry.unregister("sample-theme")
    ).toBe(true);

    expect(
      registry.getTheme("sample-theme")
    ).toBeUndefined();
  });

  it("returns registered themes", () => {
    const registry = new ThemeRegistry();

    const first = createTheme(
      "first-theme",
      "First Theme"
    );

    const second = createTheme(
      "second-theme",
      "Second Theme"
    );

    registry.register(first);
    registry.register(second);

    expect(
      registry.getThemes()
    ).toEqual([first, second]);
  });
});
import {
  validateThemeManifest,
} from "./ThemeManifestValidator";

import type { Theme } from "./Theme";

export type ThemeLoadResult =
  | {
      success: true;
      theme: Theme;
    }
  | {
      success: false;
      errors: string[];
    };

function resolveAsset(
  root: string,
  relativePath: string
): string {
  const normalizedRoot = root.endsWith("/")
    ? root
    : `${root}/`;

  const normalizedPath = relativePath.startsWith("/")
    ? relativePath.slice(1)
    : relativePath;

  return `${normalizedRoot}${normalizedPath}`;
}

export function loadTheme(
  rawManifest: unknown,
  themeRoot: string
): ThemeLoadResult {
  const validation =
    validateThemeManifest(rawManifest);

  if (!validation.valid) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const manifest = validation.manifest;

  return {
    success: true,

    theme: {
      manifest,

      thumbnail: resolveAsset(
        themeRoot,
        manifest.thumbnail
      ),

      assets: {
        animation: {
          frame01HighRes: resolveAsset(
            themeRoot,
            manifest.assets.animation.frame01HighRes
          ),

          spriteSheet: resolveAsset(
            themeRoot,
            manifest.assets.animation.spriteSheet
          ),

          frame25HighRes: resolveAsset(
            themeRoot,
            manifest.assets.animation.frame25HighRes
          ),
        },

        visual: {
          backgroundPortrait: resolveAsset(
            themeRoot,
            manifest.assets.visual.backgroundPortrait
          ),

          backgroundLandscape: resolveAsset(
            themeRoot,
            manifest.assets.visual.backgroundLandscape
          ),

          hero: resolveAsset(
            themeRoot,
            manifest.assets.visual.hero
          ),
        },
      },
    },
  };
}
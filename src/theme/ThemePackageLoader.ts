import type { Theme } from "./Theme";
import { loadTheme } from "./ThemeLoader";

export type ThemePackageLoadResult =
  | {
      success: true;
      theme: Theme;
    }
  | {
      success: false;
      errors: string[];
    };

export async function loadThemePackage(
  themeRoot: string
): Promise<ThemePackageLoadResult> {
  const normalizedRoot = themeRoot.endsWith("/")
    ? themeRoot
    : `${themeRoot}/`;

  const manifestUrl =
    `${normalizedRoot}manifest.json`;

  try {
    const response = await fetch(manifestUrl);

    if (!response.ok) {
      return {
        success: false,
        errors: [
          `Failed to load theme manifest: ${response.status} ${response.statusText}`,
        ],
      };
    }

    const rawManifest: unknown =
      await response.json();

    const result = loadTheme(
      rawManifest,
      normalizedRoot
    );

    if (!result.success) {
      return {
        success: false,
        errors: result.errors,
      };
    }

    return {
      success: true,
      theme: result.theme,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error while loading theme package.";

    return {
      success: false,
      errors: [
        `Failed to load theme package: ${message}`,
      ],
    };
  }
}
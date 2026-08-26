import { loadThemePackage } from "./ThemePackageLoader";
import { ThemeRegistry } from "./ThemeRegistry";

export type ThemeManagerLoadResult =
  | {
      success: true;
      themeId: string;
    }
  | {
      success: false;
      errors: string[];
    };

export class ThemeManager {
  private readonly registry: ThemeRegistry;

  constructor(registry: ThemeRegistry) {
    this.registry = registry;
  }

  async loadAndActivate(
    themeRoot: string
  ): Promise<ThemeManagerLoadResult> {
    const result =
      await loadThemePackage(themeRoot);

    if (!result.success) {
      return {
        success: false,
        errors: result.errors,
      };
    }

    const theme = result.theme;

    this.registry.register(theme);

    this.registry.setActiveTheme(
      theme.manifest.id
    );

    return {
      success: true,
      themeId: theme.manifest.id,
    };
  }
}
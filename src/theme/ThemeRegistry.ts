import type { Theme } from "./Theme";

export class ThemeRegistry {
  private readonly themes = new Map<string, Theme>();
  private activeThemeId: string | null = null;

  register(theme: Theme): void {
    this.themes.set(theme.manifest.id, theme);

    if (this.activeThemeId === null) {
      this.activeThemeId = theme.manifest.id;
    }
  }

  unregister(themeId: string): boolean {
    const removed = this.themes.delete(themeId);

    if (
      removed &&
      this.activeThemeId === themeId
    ) {
      this.activeThemeId =
        this.themes.keys().next().value ?? null;
    }

    return removed;
  }

  setActiveTheme(themeId: string): void {
    if (!this.themes.has(themeId)) {
      throw new Error(
        `Cannot activate unknown theme "${themeId}".`
      );
    }

    this.activeThemeId = themeId;
  }

  getActiveTheme(): Theme {
    if (this.activeThemeId === null) {
      throw new Error(
        "No active theme is registered."
      );
    }

    const theme = this.themes.get(
      this.activeThemeId
    );

    if (!theme) {
      throw new Error(
        `Active theme "${this.activeThemeId}" is not registered.`
      );
    }

    return theme;
  }

  getTheme(themeId: string): Theme | undefined {
    return this.themes.get(themeId);
  }

  getThemes(): Theme[] {
    return Array.from(this.themes.values());
  }
}
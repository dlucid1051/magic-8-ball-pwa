import type { Theme } from "./Theme";
import type { VisualAssets } from "./VisualAssets";

export class ThemeVisualAssetResolver {
  private readonly theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  resolveVisualAssets(): VisualAssets {
    return {
      backgroundPortrait:
        this.theme.assets.visual.backgroundPortrait,

      backgroundLandscape:
        this.theme.assets.visual.backgroundLandscape,

      hero:
        this.theme.assets.visual.hero,
    };
  }
}
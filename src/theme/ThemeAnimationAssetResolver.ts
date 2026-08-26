import type { AnimationAssets } from "../animation/AnimationAssets";
import type { AnimationAssetResolver } from "../animation/AnimationAssetResolver";
import type { Theme } from "./Theme";

export class ThemeAnimationAssetResolver
  implements AnimationAssetResolver
{
  private readonly theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  resolveAnimationAssets(): AnimationAssets {
    return {
      frame01HighRes:
        this.theme.assets.animation.frame01HighRes,

      spriteSheet:
        this.theme.assets.animation.spriteSheet,

      frame25HighRes:
        this.theme.assets.animation.frame25HighRes,
    };
  }
}
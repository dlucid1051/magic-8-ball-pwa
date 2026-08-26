import type { AnimationAssets } from "./AnimationAssets";
import { AnimationDisplayMode } from "./AnimationDisplayMode";

export type AnimationAssetSelection =
  | {
      mode: typeof AnimationDisplayMode.INITIAL_STATIC;
      asset: string;
    }
  | {
      mode: typeof AnimationDisplayMode.SPRITE_ANIMATION;
      asset: string;
    }
  | {
      mode: typeof AnimationDisplayMode.FINAL_STATIC;
      asset: string;
    };

export function selectAnimationAsset(
  mode: AnimationDisplayMode,
  assets: AnimationAssets
): AnimationAssetSelection {
  switch (mode) {
    case AnimationDisplayMode.INITIAL_STATIC:
      return {
        mode,
        asset: assets.frame01HighRes,
      };

    case AnimationDisplayMode.SPRITE_ANIMATION:
      return {
        mode,
        asset: assets.spriteSheet,
      };

    case AnimationDisplayMode.FINAL_STATIC:
      return {
        mode,
        asset: assets.frame25HighRes,
      };
  }
}
import type { AnimationAssets } from "./AnimationAssets";

export type AnimationAssetResolver = {
  resolveAnimationAssets(): AnimationAssets;
};
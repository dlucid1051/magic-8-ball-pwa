import type { ThemeManifest } from "./ThemeManifest";

export type Theme = {
  manifest: ThemeManifest;

  thumbnail: string;

  assets: {
    animation: {
      frame01HighRes: string;
      spriteSheet: string;
      frame25HighRes: string;
    };

    visual: {
      backgroundPortrait: string;
      backgroundLandscape: string;
      hero: string;
    };
  };
};
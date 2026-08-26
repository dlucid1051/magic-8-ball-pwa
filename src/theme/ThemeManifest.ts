export type ThemeManifest = {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  thumbnail: string;

  compatibility: {
    minAppVersion: string;
  };

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
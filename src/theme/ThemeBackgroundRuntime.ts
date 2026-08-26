import type { VisualAssets } from "./VisualAssets";

import {
  resolveThemeBackground,
} from "./ThemeBackgroundResolver";

import {
  getViewportOrientation,
} from "./ViewportOrientation";

export function updateThemeBackground(
  image: HTMLImageElement,
  assets: VisualAssets,
  width: number,
  height: number
): void {
  const orientation =
    getViewportOrientation(
      width,
      height
    );

  const background =
    resolveThemeBackground(
      assets,
      orientation
    );

  image.src = background;

  image.alt =
    `Theme ${orientation} background`;
}
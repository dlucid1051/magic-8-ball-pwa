import type { VisualAssets } from "./VisualAssets";

export type ViewportOrientation =
  | "portrait"
  | "landscape";

export function resolveThemeBackground(
  assets: VisualAssets,
  orientation: ViewportOrientation
): string {
  if (orientation === "portrait") {
    return assets.backgroundPortrait;
  }

  return assets.backgroundLandscape;
}
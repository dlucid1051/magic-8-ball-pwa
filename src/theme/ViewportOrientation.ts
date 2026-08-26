import type { ViewportOrientation } from "./ThemeBackgroundResolver";

export function getViewportOrientation(
  width: number,
  height: number
): ViewportOrientation {
  return width >= height
    ? "landscape"
    : "portrait";
}
import type { VisualAssets } from "./VisualAssets";

import {
  updateThemeBackground,
} from "./ThemeBackgroundRuntime";

import {
  getViewportOrientation,
} from "./ViewportOrientation";

export type ResizeEventTarget = {
  addEventListener(
    type: "resize",
    listener: () => void
  ): void;

  removeEventListener(
    type: "resize",
    listener: () => void
  ): void;

  innerWidth: number;
  innerHeight: number;
};

export function createThemeBackgroundResizeHandler(
  image: HTMLImageElement,
  orientationElement: HTMLElement,
  assets: VisualAssets,
  eventTarget: ResizeEventTarget
): () => void {
  const update = (): void => {
    const orientation =
      getViewportOrientation(
        eventTarget.innerWidth,
        eventTarget.innerHeight
      );

    updateThemeBackground(
      image,
      assets,
      eventTarget.innerWidth,
      eventTarget.innerHeight
    );

    orientationElement.textContent =
      orientation;
  };

  eventTarget.addEventListener(
    "resize",
    update
  );

  return (): void => {
    eventTarget.removeEventListener(
      "resize",
      update
    );
  };
}
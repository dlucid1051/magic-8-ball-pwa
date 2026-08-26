import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  createThemeBackgroundResizeHandler,
} from "../../src/theme/ThemeBackgroundResizeHandler";

import type {
  VisualAssets,
} from "../../src/theme/VisualAssets";

const visualAssets: VisualAssets = {
  backgroundPortrait:
    "/themes/sample-theme/visual/background-portrait.webp",

  backgroundLandscape:
    "/themes/sample-theme/visual/background-landscape.webp",

  hero:
    "/themes/sample-theme/visual/hero.webp",
};

function createEventTarget() {
  return {
    innerWidth: 800,
    innerHeight: 600,

    addEventListener: vi.fn(),

    removeEventListener: vi.fn(),
  };
}

function createImage(): HTMLImageElement {
  return {
    src: "",
    alt: "",
  } as HTMLImageElement;
}

function createOrientationElement(): HTMLElement {
  return {
    textContent: "",
  } as HTMLElement;
}

describe(
  "createThemeBackgroundResizeHandler",
  () => {
    it(
      "registers a resize listener",
      () => {
        const eventTarget =
          createEventTarget();

        const image =
          createImage();

        const orientationElement =
          createOrientationElement();

        createThemeBackgroundResizeHandler(
          image,
          orientationElement,
          visualAssets,
          eventTarget
        );

        expect(
          eventTarget.addEventListener
        ).toHaveBeenCalledWith(
          "resize",
          expect.any(Function)
        );
      }
    );

    it(
      "returns a cleanup function that removes the resize listener",
      () => {
        const eventTarget =
          createEventTarget();

        const image =
          createImage();

        const orientationElement =
          createOrientationElement();

        const cleanup =
          createThemeBackgroundResizeHandler(
            image,
            orientationElement,
            visualAssets,
            eventTarget
          );

        cleanup();

        expect(
          eventTarget.removeEventListener
        ).toHaveBeenCalledWith(
          "resize",
          expect.any(Function)
        );
      }
    );
  }
);
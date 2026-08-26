import { describe, expect, it, vi } from "vitest";

import { Magic8BallApp } from "../../src/app/Magic8BallApp";
import { AppState } from "../../src/app/AppState";

import { AnimationController } from "../../src/animation/AnimationController";
import { AnimationDisplayMode } from "../../src/animation/AnimationDisplayMode";
import { AnimationLifecycle } from "../../src/animation/AnimationLifecycle";
import { AnimationPlayer } from "../../src/animation/AnimationPlayer";
import type { AnimationSequence } from "../../src/animation/AnimationSequence";

import type { AnimationAssets } from "../../src/animation/AnimationAssets";
import { getAnimationDisplayMode } from "../../src/animation/getAnimationDisplayMode";
import { selectAnimationAsset } from "../../src/animation/AnimationAssetSelection";

function createSequence(): AnimationSequence {
  return {
    frames: Array.from({ length: 25 }, (_, index) => ({
      index: index + 1,
      durationMs: 50,
    })),
  };
}

const assets: AnimationAssets = {
  frame01HighRes: "/sample-theme/frame-01.webp",
  spriteSheet: "/sample-theme/shake.webp",
  frame25HighRes: "/sample-theme/frame-25.webp",
};

describe("animation system integration", () => {
  it("integrates application state, animation playback, and asset selection", () => {
    vi.useFakeTimers();

    const app = new Magic8BallApp();

    app.ask();

    expect(app.getState()).toBe(AppState.PREPARING);

    const player = new AnimationPlayer(
      createSequence()
    );

    const controller = new AnimationController(player);

    const lifecycle = new AnimationLifecycle(
      app,
      controller
    );

    const receivedFrames: number[] = [];

    lifecycle.start({
      onFrame: (frame) => {
        receivedFrames.push(frame.index);
      },
    });

    expect(app.getState()).toBe(AppState.SHAKING);

    expect(
      getAnimationDisplayMode(app.getState())
    ).toBe(AnimationDisplayMode.SPRITE_ANIMATION);

    const animationSelection = selectAnimationAsset(
      AnimationDisplayMode.SPRITE_ANIMATION,
      assets
    );

    expect(animationSelection.asset).toBe(
      assets.spriteSheet
    );

    vi.runAllTimers();

    expect(receivedFrames).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
    ]);

    expect(app.getState()).toBe(
      AppState.REVEALING
    );

    expect(
      getAnimationDisplayMode(app.getState())
    ).toBe(AnimationDisplayMode.FINAL_STATIC);

    const finalSelection = selectAnimationAsset(
      AnimationDisplayMode.FINAL_STATIC,
      assets
    );

    expect(finalSelection.asset).toBe(
      assets.frame25HighRes
    );

    vi.useRealTimers();
  });
});
import { describe, expect, it, vi } from "vitest";

import { Magic8BallApp } from "../../src/app/Magic8BallApp";
import { AppState } from "../../src/app/AppState";
import { AnimationController } from "../../src/animation/AnimationController";
import { AnimationLifecycle } from "../../src/animation/AnimationLifecycle";
import { AnimationPlayer } from "../../src/animation/AnimationPlayer";
import type { AnimationSequence } from "../../src/animation/AnimationSequence";

function createSequence(): AnimationSequence {
  return {
    frames: Array.from({ length: 25 }, (_, index) => ({
      index: index + 1,
      durationMs: 100,
    })),
  };
}

describe("AnimationLifecycle", () => {
  it("moves the application to shaking when animation starts", () => {
    vi.useFakeTimers();

    const app = new Magic8BallApp();
    app.ask();

    const player = new AnimationPlayer(
      createSequence()
    );

    const controller = new AnimationController(player);

    const lifecycle = new AnimationLifecycle(
      app,
      controller
    );

    lifecycle.start({
      onFrame: () => {},
    });

    expect(app.getState()).toBe(AppState.SHAKING);

    vi.useRealTimers();
  });

  it("moves the application to revealing when animation completes", () => {
    vi.useFakeTimers();

    const app = new Magic8BallApp();
    app.ask();

    const player = new AnimationPlayer(
      createSequence()
    );

    const controller = new AnimationController(player);

    const lifecycle = new AnimationLifecycle(
      app,
      controller
    );

    lifecycle.start({
      onFrame: () => {},
    });

    expect(app.getState()).toBe(AppState.SHAKING);

    vi.runAllTimers();

    expect(app.getState()).toBe(AppState.REVEALING);

    vi.useRealTimers();
  });

  it("forwards all 25 frames during the animation", () => {
    vi.useFakeTimers();

    const receivedFrames: number[] = [];

    const app = new Magic8BallApp();
    app.ask();

    const player = new AnimationPlayer(
      createSequence()
    );

    const controller = new AnimationController(player);

    const lifecycle = new AnimationLifecycle(
      app,
      controller
    );

    lifecycle.start({
      onFrame: (frame) => {
        receivedFrames.push(frame.index);
      },
    });

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

    vi.useRealTimers();
  });
});
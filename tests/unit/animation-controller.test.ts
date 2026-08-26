import { describe, expect, it, vi } from "vitest";

import type { AnimationSequence } from "../../src/animation/AnimationSequence";
import { AnimationController } from "../../src/animation/AnimationController";
import { AnimationPlayer } from "../../src/animation/AnimationPlayer";

function createSequence(): AnimationSequence {
  return {
    frames: Array.from({ length: 25 }, (_, index) => ({
      index: index + 1,
      durationMs: 100,
    })),
  };
}

describe("AnimationController", () => {
  it("forwards animation frames to the supplied callback", () => {
    vi.useFakeTimers();

    const onFrame = vi.fn();
    const onComplete = vi.fn();

    const player = new AnimationPlayer(
      createSequence()
    );

    const controller = new AnimationController(player);

    controller.play({
      onFrame,
      onComplete,
    });

    expect(onFrame).toHaveBeenCalledWith({
      index: 1,
      durationMs: 100,
    });

    vi.useRealTimers();
  });

  it("forwards completion after playback finishes", () => {
    vi.useFakeTimers();

    const onComplete = vi.fn();

    const player = new AnimationPlayer(
      createSequence()
    );

    const controller = new AnimationController(player);

    controller.play({
      onFrame: () => {},
      onComplete,
    });

    vi.runAllTimers();

    expect(onComplete).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
import { describe, expect, it, vi } from "vitest";

import { AnimationPlayer } from "../../src/animation/AnimationPlayer";
import type { AnimationSequence } from "../../src/animation/AnimationSequence";

function createSequence(
  frameDurationMs = 100
): AnimationSequence {
  return {
    frames: Array.from({ length: 25 }, (_, index) => ({
      index: index + 1,
      durationMs: frameDurationMs,
    })),
  };
}

describe("AnimationPlayer", () => {
  it("emits frame 1 immediately when playback begins", () => {
    vi.useFakeTimers();

    const onFrame = vi.fn();
    const onComplete = vi.fn();

    const player = new AnimationPlayer(
      createSequence()
    );

    player.play({
      onFrame,
      onComplete,
    });

    expect(onFrame).toHaveBeenCalledTimes(1);
    expect(onFrame).toHaveBeenCalledWith({
      index: 1,
      durationMs: 100,
    });

    expect(onComplete).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it("plays all 25 frames in order", () => {
    vi.useFakeTimers();

    const receivedFrames: number[] = [];

    const player = new AnimationPlayer(
      createSequence()
    );

    player.play({
      onFrame: (frame) => {
        receivedFrames.push(frame.index);
      },
      onComplete: () => {},
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

  it("calls onComplete after the final frame", () => {
    vi.useFakeTimers();

    const events: string[] = [];

    const player = new AnimationPlayer(
      createSequence()
    );

    player.play({
      onFrame: (frame) => {
        events.push(`frame-${frame.index}`);
      },
      onComplete: () => {
        events.push("complete");
      },
    });

    vi.runAllTimers();

    expect(events[24]).toBe("frame-25");
    expect(events[25]).toBe("complete");

    vi.useRealTimers();
  });

  it("uses each frame duration before advancing", () => {
    vi.useFakeTimers();

    const receivedFrames: number[] = [];

    const sequence: AnimationSequence = {
      frames: Array.from({ length: 25 }, (_, index) => ({
        index: index + 1,
        durationMs: 100,
      })),
    };

    const player = new AnimationPlayer(sequence);

    player.play({
      onFrame: (frame) => {
        receivedFrames.push(frame.index);
      },
      onComplete: () => {},
    });

    expect(receivedFrames).toEqual([1]);

    vi.advanceTimersByTime(99);

    expect(receivedFrames).toEqual([1]);

    vi.advanceTimersByTime(1);

    expect(receivedFrames).toEqual([1, 2]);

    vi.useRealTimers();
  });
});
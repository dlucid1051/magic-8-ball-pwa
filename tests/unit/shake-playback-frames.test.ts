import { describe, expect, it } from "vitest";

import type { AnimationSequence } from "../../src/animation/AnimationSequence";
import { getShakePlaybackFrames } from "../../src/animation/getShakePlaybackFrames";

function createSequence(): AnimationSequence {
  return {
    frames: Array.from({ length: 25 }, (_, index) => ({
      index: index + 1,
      durationMs: 100,
    })),
  };
}

describe("shake playback frames", () => {
  it("returns all 25 frames", () => {
    const sequence = createSequence();

    const frames = getShakePlaybackFrames(sequence);

    expect(frames).toHaveLength(25);
  });

  it("starts playback with frame 1", () => {
    const sequence = createSequence();

    const frames = getShakePlaybackFrames(sequence);

    expect(frames[0].index).toBe(1);
  });

  it("ends playback with frame 25", () => {
    const sequence = createSequence();

    const frames = getShakePlaybackFrames(sequence);

    expect(frames[24].index).toBe(25);
  });

  it("preserves all frame indexes in order", () => {
    const sequence = createSequence();

    const frames = getShakePlaybackFrames(sequence);

    expect(
      frames.map((frame) => frame.index)
    ).toEqual([
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
  });

  it("preserves frame durations", () => {
    const sequence: AnimationSequence = {
      frames: Array.from({ length: 25 }, (_, index) => ({
        index: index + 1,
        durationMs: (index + 1) * 10,
      })),
    };

    const frames = getShakePlaybackFrames(sequence);

    expect(
      frames.map((frame) => frame.durationMs)
    ).toEqual([
      10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      100,
      110,
      120,
      130,
      140,
      150,
      160,
      170,
      180,
      190,
      200,
      210,
      220,
      230,
      240,
      250,
    ]);
  });
});
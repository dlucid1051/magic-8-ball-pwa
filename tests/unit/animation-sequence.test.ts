import { describe, expect, it } from "vitest";

import type { AnimationSequence } from "../../src/animation/AnimationSequence";
import { validateAnimationSequence } from "../../src/animation/validateAnimationSequence";

function createValidSequence(): AnimationSequence {
  return {
    frames: Array.from({ length: 25 }, (_, index) => ({
      index: index + 1,
      durationMs: 100,
    })),
  };
}

describe("animation sequence validation", () => {
  it("accepts a valid 25-frame sequence", () => {
    const sequence = createValidSequence();

    expect(() => {
      validateAnimationSequence(sequence);
    }).not.toThrow();
  });

  it("rejects a sequence with fewer than 25 frames", () => {
    const sequence: AnimationSequence = {
      frames: createValidSequence().frames.slice(0, 24),
    };

    expect(() => {
      validateAnimationSequence(sequence);
    }).toThrow(
      "Animation sequence must contain exactly 25 frames. Received 24."
    );
  });

  it("rejects a sequence with more than 25 frames", () => {
    const sequence: AnimationSequence = {
      frames: [
        ...createValidSequence().frames,
        {
          index: 26,
          durationMs: 100,
        },
      ],
    };

    expect(() => {
      validateAnimationSequence(sequence);
    }).toThrow(
      "Animation sequence must contain exactly 25 frames. Received 26."
    );
  });

  it("rejects incorrectly ordered frame indexes", () => {
    const frames = [...createValidSequence().frames];

    frames[4] = {
      index: 99,
      durationMs: 100,
    };

    const sequence: AnimationSequence = {
      frames,
    };

    expect(() => {
      validateAnimationSequence(sequence);
    }).toThrow(
      "Animation frame 5 must have index 5. Received 99."
    );
  });

  it("rejects a frame with a zero duration", () => {
    const frames = [...createValidSequence().frames];

    frames[9] = {
      index: 10,
      durationMs: 0,
    };

    const sequence: AnimationSequence = {
      frames,
    };

    expect(() => {
      validateAnimationSequence(sequence);
    }).toThrow(
      "Animation frame 10 must have a positive duration."
    );
  });

  it("rejects a frame with a negative duration", () => {
    const frames = [...createValidSequence().frames];

    frames[14] = {
      index: 15,
      durationMs: -100,
    };

    const sequence: AnimationSequence = {
      frames,
    };

    expect(() => {
      validateAnimationSequence(sequence);
    }).toThrow(
      "Animation frame 15 must have a positive duration."
    );
  });
});
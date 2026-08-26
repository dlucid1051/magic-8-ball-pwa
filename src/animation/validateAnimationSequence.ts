import type { AnimationSequence } from "./AnimationSequence";

export function validateAnimationSequence(
  sequence: AnimationSequence
): void {
  const { frames } = sequence;

  if (frames.length !== 25) {
    throw new Error(
      `Animation sequence must contain exactly 25 frames. Received ${frames.length}.`
    );
  }

  for (let index = 0; index < frames.length; index += 1) {
    const frame = frames[index];

    if (frame.index !== index + 1) {
      throw new Error(
        `Animation frame ${index + 1} must have index ${index + 1}. Received ${frame.index}.`
      );
    }

    if (frame.durationMs <= 0) {
      throw new Error(
        `Animation frame ${frame.index} must have a positive duration.`
      );
    }
  }
}
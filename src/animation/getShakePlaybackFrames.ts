import type { AnimationFrame } from "./AnimationFrame";
import type { AnimationSequence } from "./AnimationSequence";

export function getShakePlaybackFrames(
  sequence: AnimationSequence
): readonly AnimationFrame[] {
  return sequence.frames;
}
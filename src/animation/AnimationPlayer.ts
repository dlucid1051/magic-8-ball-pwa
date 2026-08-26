import type { AnimationFrame } from "./AnimationFrame";
import type { AnimationSequence } from "./AnimationSequence";
import { validateAnimationSequence } from "./validateAnimationSequence";

export type AnimationPlayerCallbacks = {
  onFrame: (frame: AnimationFrame) => void;
  onComplete: () => void;
};

export class AnimationPlayer {
  private readonly sequence: AnimationSequence;

  constructor(sequence: AnimationSequence) {
    validateAnimationSequence(sequence);

    this.sequence = sequence;
  }

  play(callbacks: AnimationPlayerCallbacks): void {
    let framePosition = 0;

    const playNextFrame = (): void => {
      const frame = this.sequence.frames[framePosition];

      callbacks.onFrame(frame);

      const isFinalFrame =
        framePosition === this.sequence.frames.length - 1;

      if (isFinalFrame) {
        callbacks.onComplete();
        return;
      }

      framePosition += 1;

      setTimeout(playNextFrame, frame.durationMs);
    };

    playNextFrame();
  }
}
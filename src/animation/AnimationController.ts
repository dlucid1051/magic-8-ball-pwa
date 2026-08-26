import type { AnimationFrame } from "./AnimationFrame";
import { AnimationPlayer } from "./AnimationPlayer";

export type AnimationControllerCallbacks = {
  onFrame: (frame: AnimationFrame) => void;
  onComplete: () => void;
};

export class AnimationController {
  private readonly player: AnimationPlayer;

  constructor(player: AnimationPlayer) {
    this.player = player;
  }

  play(callbacks: AnimationControllerCallbacks): void {
    this.player.play({
      onFrame: callbacks.onFrame,
      onComplete: callbacks.onComplete,
    });
  }
}
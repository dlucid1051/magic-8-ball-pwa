import type { Magic8BallApp } from "../app/Magic8BallApp";
import type { AnimationFrame } from "./AnimationFrame";
import type { AnimationController } from "./AnimationController";

export type AnimationLifecycleCallbacks = {
  onFrame: (frame: AnimationFrame) => void;
};

export class AnimationLifecycle {
  private readonly app: Magic8BallApp;
  private readonly controller: AnimationController;

  constructor(
    app: Magic8BallApp,
    controller: AnimationController
  ) {
    this.app = app;
    this.controller = controller;
  }

  start(callbacks: AnimationLifecycleCallbacks): void {
    this.app.startShake();

    this.controller.play({
      onFrame: callbacks.onFrame,
      onComplete: () => {
        this.app.animationComplete();
      },
    });
  }
}
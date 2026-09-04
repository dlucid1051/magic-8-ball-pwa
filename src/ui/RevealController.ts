// src/ui/RevealController.ts

import { AnimationController } from '../animation/AnimationController';

export interface Answer {
  text: string;
}

export type RevealCallbacks = {
  onAnimationComplete: () => void;
  onRevealComplete: () => void;
};

export class RevealController {
  private viewportElement: HTMLElement;
  private animationController: AnimationController;
  private getAnswer: () => Answer | null;
  private callbacks: RevealCallbacks;

  constructor(
    viewportElement: HTMLElement,
    animationController: AnimationController,
    getAnswer: () => Answer | null,
    callbacks: RevealCallbacks
  ) {
    this.viewportElement = viewportElement;
    this.animationController = animationController;
    this.getAnswer = getAnswer;
    this.callbacks = callbacks;
  }

  public triggerAnimationAndReveal(): void {
    this.reset();

    this.animationController.play({
      onFrame: (_frame) => {
        // Frame updates if necessary
      },
      onComplete: () => {
        // Step 1: Animation is done, triggers transition to REVEALING
        this.callbacks.onAnimationComplete();
        
        // Step 2: Reveal the answer text in the viewport
        this.revealAnswer();

        // Step 3: Reveal is finished, triggers transition to ANSWER_VISIBLE
        this.callbacks.onRevealComplete();
      },
    });
  }

  private revealAnswer(): void {
    const currentAnswer = this.getAnswer();
    if (currentAnswer) {
      this.viewportElement.textContent = currentAnswer.text;
      this.viewportElement.classList.add('is-revealed');
    }
  }

  public reset(): void {
    this.viewportElement.textContent = '';
    this.viewportElement.classList.remove('is-revealed');
  }
}
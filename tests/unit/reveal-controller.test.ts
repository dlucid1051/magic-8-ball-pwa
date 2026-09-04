// tests/unit/reveal-controller.test.ts

import { describe, it, expect, vi } from 'vitest';
import { RevealController } from '../../src/ui/RevealController';
import { AnimationController } from '../../src/animation/AnimationController';
import { AnimationPlayer } from '../../src/animation/AnimationPlayer';

// Helper to generate a valid AnimationSequence object with 25 frames
const mockSequence = {
  frames: Array.from({ length: 25 }, (_, i) => ({
    index: i + 1,
    duration: 40,
    x: 0,
    y: 0,
  })),
};

describe('RevealController', () => {
  it('should reveal the answer and trigger lifecycle callbacks when animation completes', () => {
    const viewport = document.createElement('div');
    const player = new AnimationPlayer(mockSequence as any);
    const animationController = new AnimationController(player);

    // Mock play to immediately trigger completion
    vi.spyOn(animationController, 'play').mockImplementation((callbacks) => {
      callbacks.onComplete();
    });

    const getAnswer = () => ({ text: 'It is decidedly so' });
    const callbacks = {
      onAnimationComplete: vi.fn(),
      onRevealComplete: vi.fn(),
    };

    const controller = new RevealController(
      viewport,
      animationController,
      getAnswer,
      callbacks
    );

    controller.triggerAnimationAndReveal();

    expect(callbacks.onAnimationComplete).toHaveBeenCalledTimes(1);
    expect(callbacks.onRevealComplete).toHaveBeenCalledTimes(1);
    expect(viewport.textContent).toBe('It is decidedly so');
    expect(viewport.classList.contains('is-revealed')).toBe(true);
  });

  it('should properly reset viewport content and reveal state', () => {
    const viewport = document.createElement('div');
    viewport.textContent = 'Existing Text';
    viewport.classList.add('is-revealed');

    const player = new AnimationPlayer(mockSequence as any);
    const animationController = new AnimationController(player);
    const getAnswer = () => ({ text: 'Test' });
    const callbacks = {
      onAnimationComplete: vi.fn(),
      onRevealComplete: vi.fn(),
    };

    const controller = new RevealController(
      viewport,
      animationController,
      getAnswer,
      callbacks
    );

    controller.reset();

    expect(viewport.textContent).toBe('');
    expect(viewport.classList.contains('is-revealed')).toBe(false);
  });
});
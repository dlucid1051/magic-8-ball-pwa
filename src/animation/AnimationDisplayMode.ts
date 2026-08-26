export const AnimationDisplayMode = {
  INITIAL_STATIC: "initial-static",
  SPRITE_ANIMATION: "sprite-animation",
  FINAL_STATIC: "final-static",
} as const;

export type AnimationDisplayMode =
  (typeof AnimationDisplayMode)[keyof typeof AnimationDisplayMode];
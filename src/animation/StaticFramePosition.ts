export const StaticFramePosition = {
  INITIAL: "initial",
  FINAL: "final",
} as const;

export type StaticFramePosition =
  (typeof StaticFramePosition)[keyof typeof StaticFramePosition];
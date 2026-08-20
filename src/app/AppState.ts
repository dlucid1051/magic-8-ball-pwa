export const AppState = {
  IDLE: "idle",
  PREPARING: "preparing",
  SHAKING: "shaking",
  REVEALING: "revealing",
  ANSWER_VISIBLE: "answer-visible",
  ERROR: "error",
} as const;

export type AppState =
  (typeof AppState)[keyof typeof AppState];
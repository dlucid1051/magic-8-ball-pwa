export type AppEvent =
  | { type: "ASK" }
  | { type: "START_SHAKE" }
  | { type: "ANIMATION_COMPLETE" }
  | { type: "REVEAL_COMPLETE" }
  | { type: "RESET" }
  | { type: "ERROR"; error: Error };
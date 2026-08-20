import type { AppEvent } from "../app/AppEvent";
import { AppState } from "../app/AppState";

export function transition(
  state: AppState,
  event: AppEvent
): AppState {
  if (event.type === "ERROR") {
    return AppState.ERROR;
  }

  switch (state) {
    case AppState.IDLE:
      if (event.type === "ASK") {
        return AppState.PREPARING;
      }
      break;

    case AppState.PREPARING:
      if (event.type === "START_SHAKE") {
        return AppState.SHAKING;
      }
      break;

    case AppState.SHAKING:
      if (event.type === "ANIMATION_COMPLETE") {
        return AppState.REVEALING;
      }
      break;

    case AppState.REVEALING:
      if (event.type === "REVEAL_COMPLETE") {
        return AppState.ANSWER_VISIBLE;
      }
      break;

    case AppState.ANSWER_VISIBLE:
      if (event.type === "ASK") {
        return AppState.PREPARING;
      }

      if (event.type === "RESET") {
        return AppState.IDLE;
      }
      break;

    case AppState.ERROR:
        if (event.type === "RESET") {
            return AppState.IDLE;
        }
        break;

    }

  throw new Error(
    `Invalid transition: state "${state}" cannot handle event "${event.type}".`
  );
}
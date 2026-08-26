import { AppState } from "../app/AppState";
import {
  AnimationDisplayMode,
  type AnimationDisplayMode as AnimationDisplayModeType,
} from "./AnimationDisplayMode";

export function getAnimationDisplayMode(
  state: AppState
): AnimationDisplayModeType {
  switch (state) {
    case AppState.IDLE:
    case AppState.PREPARING:
      return AnimationDisplayMode.INITIAL_STATIC;

    case AppState.SHAKING:
      return AnimationDisplayMode.SPRITE_ANIMATION;

    case AppState.REVEALING:
    case AppState.ANSWER_VISIBLE:
      return AnimationDisplayMode.FINAL_STATIC;

    case AppState.ERROR:
      return AnimationDisplayMode.INITIAL_STATIC;

    default:
      return AnimationDisplayMode.INITIAL_STATIC;
  }
}
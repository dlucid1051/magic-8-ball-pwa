import {
  StaticFramePosition,
  type StaticFramePosition as StaticFramePositionType,
} from "./StaticFramePosition";

export function getStaticFrameIndex(
  position: StaticFramePositionType
): number {
  if (position === StaticFramePosition.INITIAL) {
    return 1;
  }

  return 25;
}
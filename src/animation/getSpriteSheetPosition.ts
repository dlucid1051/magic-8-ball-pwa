export type SpriteSheetPosition = {
  row: number;
  column: number;
};

const SPRITE_SHEET_COLUMNS = 5;
const SPRITE_SHEET_ROWS = 5;
const TOTAL_FRAMES =
  SPRITE_SHEET_COLUMNS * SPRITE_SHEET_ROWS;

export function getSpriteSheetPosition(
  frameIndex: number
): SpriteSheetPosition {
  if (
    !Number.isInteger(frameIndex) ||
    frameIndex < 1 ||
    frameIndex > TOTAL_FRAMES
  ) {
    throw new Error(
      `Sprite sheet frame index must be an integer between 1 and ${TOTAL_FRAMES}. Received ${frameIndex}.`
    );
  }

  const zeroBasedIndex = frameIndex - 1;

  return {
    row: Math.floor(
      zeroBasedIndex / SPRITE_SHEET_COLUMNS
    ),
    column:
      zeroBasedIndex % SPRITE_SHEET_COLUMNS,
  };
}
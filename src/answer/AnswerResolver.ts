import type { AnswerSet } from "./AnswerSet";
import type { AnswerSource } from "./AnswerSource";

export function resolveAnswerSet(
  source: AnswerSource
): AnswerSet {
  if (source.userImported) {
    return source.userImported;
  }

  return source.fallback;
}
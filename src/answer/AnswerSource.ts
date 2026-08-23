import type { AnswerSet } from "./AnswerSet";

export type AnswerSource = {
  userImported?: AnswerSet;
  fallback: AnswerSet;
};
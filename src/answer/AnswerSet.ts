import type { Answer } from "./Answer";

export type AnswerSet = {
  id: string;
  answers: readonly Answer[];
};
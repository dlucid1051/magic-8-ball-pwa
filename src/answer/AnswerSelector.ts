import type { Answer } from "./Answer";
import type { AnswerSet } from "./AnswerSet";

export function selectRandomAnswer(answerSet: AnswerSet): Answer {
  if (answerSet.answers.length === 0) {
    throw new Error(
      `Cannot select an answer from empty answer set "${answerSet.id}".`
    );
  }

  const index = Math.floor(
    Math.random() * answerSet.answers.length
  );

  return answerSet.answers[index];
}
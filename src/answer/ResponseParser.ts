import type { Answer } from "./Answer";
import type { AnswerSet } from "./AnswerSet";

export function parseResponseText(
  text: string,
  answerSetId = "user-imported"
): AnswerSet {
  const lines = text.split(/\r\n|\r|\n/);

  const answers: Answer[] = [];

  for (const line of lines) {
    const response = line.trim();

    if (response === "") {
      continue;
    }

    answers.push({
      id: `imported-${String(answers.length + 1).padStart(3, "0")}`,
      text: response,
    });
  }

  if (answers.length === 0) {
    throw new Error(
      "The imported response file does not contain any usable responses."
    );
  }

  return {
    id: answerSetId,
    answers,
  };
}
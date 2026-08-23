import type { AnswerSet } from "./AnswerSet";
import { parseResponseText } from "./ResponseParser";

export async function importResponseFile(
  file: File,
  answerSetId = "user-imported"
): Promise<AnswerSet> {
  const text = await file.text();

  return parseResponseText(text, answerSetId);
}
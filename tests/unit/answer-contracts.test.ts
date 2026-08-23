import { describe, expect, it } from "vitest";

import type { Answer } from "../../src/answer/Answer";
import type { AnswerSet } from "../../src/answer/AnswerSet";

describe("answer contracts", () => {
  it("supports an answer with an id and text", () => {
    const answer: Answer = {
      id: "test-answer",
      text: "Test response",
    };

    expect(answer.id).toBe("test-answer");
    expect(answer.text).toBe("Test response");
  });

  it("supports an answer set containing answers", () => {
    const answers: readonly Answer[] = [
      {
        id: "test-answer-1",
        text: "First response",
      },
      {
        id: "test-answer-2",
        text: "Second response",
      },
    ];

    const answerSet: AnswerSet = {
      id: "test-set",
      answers,
    };

    expect(answerSet.id).toBe("test-set");
    expect(answerSet.answers).toHaveLength(2);
  });
});
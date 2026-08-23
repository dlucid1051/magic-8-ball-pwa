import { describe, expect, it, vi } from "vitest";

import type { AnswerSet } from "../../src/answer/AnswerSet";
import { selectRandomAnswer } from "../../src/answer/AnswerSelector";

describe("answer selector", () => {
  const testAnswerSet: AnswerSet = {
    id: "test-set",
    answers: [
      {
        id: "answer-1",
        text: "First response",
      },
      {
        id: "answer-2",
        text: "Second response",
      },
      {
        id: "answer-3",
        text: "Third response",
      },
    ],
  };

  it("returns an answer from the supplied answer set", () => {
    const answer = selectRandomAnswer(testAnswerSet);

    expect(testAnswerSet.answers).toContain(answer);
  });

  it("can select the first answer", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const answer = selectRandomAnswer(testAnswerSet);

    expect(answer.id).toBe("answer-1");

    vi.restoreAllMocks();
  });

  it("can select the last answer", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999999);

    const answer = selectRandomAnswer(testAnswerSet);

    expect(answer.id).toBe("answer-3");

    vi.restoreAllMocks();
  });

  it("throws when the answer set is empty", () => {
    const emptyAnswerSet: AnswerSet = {
      id: "empty-set",
      answers: [],
    };

    expect(() =>
      selectRandomAnswer(emptyAnswerSet)
    ).toThrow(
      'Cannot select an answer from empty answer set "empty-set".'
    );
  });
});
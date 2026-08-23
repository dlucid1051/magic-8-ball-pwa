import { describe, expect, it } from "vitest";

import { defaultAnswerSet } from "../../src/answer/defaultAnswers";

describe("default answer set", () => {
  it("has the core default identifier", () => {
    expect(defaultAnswerSet.id).toBe("core-default");
  });

  it("contains exactly 20 responses", () => {
    expect(defaultAnswerSet.answers).toHaveLength(20);
  });

  it("contains answers with unique identifiers", () => {
    const ids = defaultAnswerSet.answers.map((answer) => answer.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(ids.length);
  });

  it("contains no empty response text", () => {
    for (const answer of defaultAnswerSet.answers) {
      expect(answer.text.trim()).not.toBe("");
    }
  });
});
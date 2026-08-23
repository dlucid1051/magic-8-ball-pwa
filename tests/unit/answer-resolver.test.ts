import { describe, expect, it } from "vitest";

import type { AnswerSet } from "../../src/answer/AnswerSet";
import { resolveAnswerSet } from "../../src/answer/AnswerResolver";

describe("answer source resolver", () => {
  const fallback: AnswerSet = {
    id: "fallback",
    answers: [
      {
        id: "fallback-1",
        text: "Fallback response",
      },
    ],
  };

  const imported: AnswerSet = {
    id: "imported",
    answers: [
      {
        id: "imported-1",
        text: "Imported response",
      },
    ],
  };

  it("uses the user-imported responses when available", () => {
    const result = resolveAnswerSet({
      userImported: imported,
      fallback,
    });

    expect(result.id).toBe("imported");
  });

  it("uses the fallback when no imported responses exist", () => {
    const result = resolveAnswerSet({
      fallback,
    });

    expect(result.id).toBe("fallback");
  });
});
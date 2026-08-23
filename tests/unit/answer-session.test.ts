import { describe, expect, it } from "vitest";

import type { AnswerSet } from "../../src/answer/AnswerSet";
import { AnswerSession } from "../../src/answer/AnswerSession";

describe("answer session", () => {
  const importedAnswerSet: AnswerSet = {
    id: "user-imported",
    answers: [
      {
        id: "imported-001",
        text: "Custom response",
      },
    ],
  };

  it("starts without imported responses", () => {
    const session = new AnswerSession();

    expect(session.getUserImported()).toBeUndefined();
  });

  it("stores imported responses for the current session", () => {
    const session = new AnswerSession();

    session.setUserImported(importedAnswerSet);

    expect(session.getUserImported()).toBe(importedAnswerSet);
  });

  it("clears imported responses", () => {
    const session = new AnswerSession();

    session.setUserImported(importedAnswerSet);
    session.clearUserImported();

    expect(session.getUserImported()).toBeUndefined();
  });
});
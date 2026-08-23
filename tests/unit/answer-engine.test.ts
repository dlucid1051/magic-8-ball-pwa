import { describe, expect, it, vi } from "vitest";

import type { AnswerSet } from "../../src/answer/AnswerSet";
import { AnswerEngine } from "../../src/answer/AnswerEngine";

describe("answer engine", () => {
  const fallback: AnswerSet = {
    id: "fallback",
    answers: [
      {
        id: "fallback-1",
        text: "Fallback one",
      },
      {
        id: "fallback-2",
        text: "Fallback two",
      },
    ],
  };

  const imported: AnswerSet = {
    id: "imported",
    answers: [
      {
        id: "imported-1",
        text: "Imported one",
      },
      {
        id: "imported-2",
        text: "Imported two",
      },
    ],
  };

  it("starts with the fallback answer set", () => {
    const engine = new AnswerEngine(fallback);

    expect(engine.getActiveAnswerSet()).toBe(fallback);
  });

  it("selects an answer from the fallback set by default", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const engine = new AnswerEngine(fallback);
    const answer = engine.selectAnswer();

    expect(answer.id).toBe("fallback-1");

    vi.restoreAllMocks();
  });

  it("uses imported responses when they are active", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const engine = new AnswerEngine(fallback);

    engine.setUserImported(imported);

    expect(engine.getActiveAnswerSet()).toBe(imported);

    const answer = engine.selectAnswer();

    expect(answer.id).toBe("imported-1");

    vi.restoreAllMocks();
  });

  it("returns to the fallback after imported responses are cleared", () => {
    const engine = new AnswerEngine(fallback);

    engine.setUserImported(imported);
    expect(engine.getActiveAnswerSet()).toBe(imported);

    engine.clearUserImported();

    expect(engine.getActiveAnswerSet()).toBe(fallback);
  });
});
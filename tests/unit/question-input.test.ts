import { describe, expect, it } from "vitest";

import {
  QuestionInput,
} from "../../src/ui/QuestionInput";

describe("QuestionInput", () => {
  it("creates a text input", () => {
    const questionInput = new QuestionInput();

    const element = questionInput.getElement();

    expect(element.tagName).toBe("INPUT");
    expect(element.type).toBe("text");
  });

  it("uses the expected default id", () => {
    const questionInput = new QuestionInput();

    expect(
      questionInput.getElement().id
    ).toBe("question-input");
  });

  it("provides an accessible label", () => {
    const questionInput = new QuestionInput();

    expect(
      questionInput
        .getElement()
        .getAttribute("aria-label")
    ).toBe("Question");
  });

  it("uses the intended placeholder", () => {
    const questionInput = new QuestionInput();

    expect(
      questionInput
        .getElement()
        .getAttribute("placeholder")
    ).toBe(
      "Type, ask, or concentrate on a question..."
    );
  });

  it("allows an empty question", () => {
    const questionInput = new QuestionInput();

    expect(questionInput.getValue()).toBe("");
  });

  it("supports an initial question value", () => {
    const questionInput = new QuestionInput({
      initialValue: "Will this work?",
    });

    expect(questionInput.getValue()).toBe(
      "Will this work?"
    );
  });

  it("allows the question value to be changed", () => {
    const questionInput = new QuestionInput();

    questionInput.setValue(
      "Should I ask the Magic 8-Ball?"
    );

    expect(questionInput.getValue()).toBe(
      "Should I ask the Magic 8-Ball?"
    );
  });

  it("can clear the question", () => {
    const questionInput = new QuestionInput({
      initialValue: "Will this work?",
    });

    questionInput.clear();

    expect(questionInput.getValue()).toBe("");
  });

  it("supports custom options", () => {
    const questionInput = new QuestionInput({
      id: "my-question",
      label: "Your question",
      placeholder: "Ask something...",
      initialValue: "Will it happen?",
    });

    const element = questionInput.getElement();

    expect(element.id).toBe("my-question");
    expect(
      element.getAttribute("aria-label")
    ).toBe("Your question");
    expect(
      element.getAttribute("placeholder")
    ).toBe("Ask something...");
    expect(questionInput.getValue()).toBe(
      "Will it happen?"
    );
  });
});
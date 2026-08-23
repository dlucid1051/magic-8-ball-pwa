import { describe, expect, it } from "vitest";

import { parseResponseText } from "../../src/answer/ResponseParser";

describe("response parser", () => {
  it("parses one response per line", () => {
    const result = parseResponseText(
      "Yes\nNo\nMaybe"
    );

    expect(result.answers).toHaveLength(3);

    expect(result.answers[0].text).toBe("Yes");
    expect(result.answers[1].text).toBe("No");
    expect(result.answers[2].text).toBe("Maybe");
  });

  it("supports Windows CRLF line endings", () => {
    const result = parseResponseText(
      "Yes\r\nNo\r\nMaybe"
    );

    expect(result.answers).toHaveLength(3);
  });

  it("supports CR line endings", () => {
    const result = parseResponseText(
      "Yes\rNo\rMaybe"
    );

    expect(result.answers).toHaveLength(3);
  });

  it("ignores blank lines", () => {
    const result = parseResponseText(
      "Yes\n\nNo\n\nMaybe\n"
    );

    expect(result.answers).toHaveLength(3);
  });

  it("trims leading and trailing whitespace", () => {
    const result = parseResponseText(
      "  Yes  \n\tNo\t"
    );

    expect(result.answers[0].text).toBe("Yes");
    expect(result.answers[1].text).toBe("No");
  });

  it("preserves duplicate responses", () => {
    const result = parseResponseText(
      "Yes\nYes\nNo\nYes"
    );

    expect(result.answers).toHaveLength(4);

    expect(result.answers.map((answer) => answer.text)).toEqual([
      "Yes",
      "Yes",
      "No",
      "Yes",
    ]);
  });

  it("generates stable sequential identifiers", () => {
    const result = parseResponseText(
      "First\nSecond\nThird"
    );

    expect(result.answers.map((answer) => answer.id)).toEqual([
      "imported-001",
      "imported-002",
      "imported-003",
    ]);
  });

  it("supports a custom answer-set identifier", () => {
    const result = parseResponseText(
      "Yes\nNo",
      "my-custom-responses"
    );

    expect(result.id).toBe("my-custom-responses");
  });

  it("rejects an empty file", () => {
    expect(() =>
      parseResponseText("")
    ).toThrow(
      "The imported response file does not contain any usable responses."
    );
  });

  it("rejects a file containing only blank lines", () => {
    expect(() =>
      parseResponseText("\n\r\n  \n\t")
    ).toThrow(
      "The imported response file does not contain any usable responses."
    );
  });
});
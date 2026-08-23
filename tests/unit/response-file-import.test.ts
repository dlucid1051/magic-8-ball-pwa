import { describe, expect, it } from "vitest";

import { importResponseFile } from "../../src/answer/ResponseFileImport";

describe("response file import", () => {
  it("imports responses from a text file", async () => {
    const file = new File(
      ["Yes\nNo\nMaybe"],
      "responses.txt",
      {
        type: "text/plain",
      }
    );

    const result = await importResponseFile(file);

    expect(result.id).toBe("user-imported");

    expect(result.answers).toHaveLength(3);

    expect(result.answers.map((answer) => answer.text)).toEqual([
      "Yes",
      "No",
      "Maybe",
    ]);
  });

  it("supports a custom answer-set identifier", async () => {
    const file = new File(
      ["Yes\nNo"],
      "responses.txt",
      {
        type: "text/plain",
      }
    );

    const result = await importResponseFile(
      file,
      "custom-responses"
    );

    expect(result.id).toBe("custom-responses");
  });

  it("rejects a file with no usable responses", async () => {
    const file = new File(
      ["\n\r\n  \n"],
      "empty.txt",
      {
        type: "text/plain",
      }
    );

    await expect(
      importResponseFile(file)
    ).rejects.toThrow(
      "The imported response file does not contain any usable responses."
    );
  });
});
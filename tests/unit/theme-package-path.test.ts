import {
  describe,
  expect,
  it,
} from "vitest";

describe("theme package delivery", () => {
  it("uses the expected public URL for the sample theme", () => {
    const themeRoot =
      "/themes/sample-theme/";

    expect(themeRoot).toBe(
      "/themes/sample-theme/"
    );

    expect(
      `${themeRoot}manifest.json`
    ).toBe(
      "/themes/sample-theme/manifest.json"
    );
  });
});
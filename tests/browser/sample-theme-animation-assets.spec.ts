import { test, expect } from "@playwright/test";

test.describe("sample theme animation assets", () => {
  test("loads frame 01", async ({ page }) => {
    const response = await page.request.get(
      "/themes/sample-theme/animation/frame-01.webp"
    );

    expect(response.ok()).toBe(true);
  });

  test("loads the sprite sheet", async ({ page }) => {
    const response = await page.request.get(
      "/themes/sample-theme/animation/shake.webp"
    );

    expect(response.ok()).toBe(true);
  });

  test("loads frame 25", async ({ page }) => {
    const response = await page.request.get(
      "/themes/sample-theme/animation/frame-25.webp"
    );

    expect(response.ok()).toBe(true);
  });
});
import { test, expect } from "@playwright/test";

test.describe("sample theme application", () => {
  test("loads the Magic 8-Ball application", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "Magic 8-Ball",
      })
    ).toBeVisible();
  });

  test("loads the sample theme background", async ({ page }) => {
    await page.goto("/");

    const background =
      page.locator("#theme-background");

    await expect(background).toBeVisible();

    await expect(background).toHaveAttribute(
      "src",
      /background-(portrait|landscape)\.webp$/
    );
  });
});
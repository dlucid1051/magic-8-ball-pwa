import { test, expect } from "@playwright/test";

test("Magic 8-Ball PWA loads", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Magic 8-Ball/i);
});
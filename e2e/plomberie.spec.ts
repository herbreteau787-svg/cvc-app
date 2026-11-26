import { test, expect } from "@playwright/test";
test("plomberie DN auto", async ({ page }) => {
  await page.goto("/plomberie");
  await expect(page.getByText("Plomberie")).toBeVisible();
});
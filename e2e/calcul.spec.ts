import { test, expect } from "@playwright/test";
test("calcul thermique", async ({ page }) => {
  await page.goto("/calcul");
  await expect(page.getByText("Calcul thermique")).toBeVisible();
});
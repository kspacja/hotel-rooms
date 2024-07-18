import { test, expect } from "@playwright/test";

test("Main page", async ({ page }) => {
  await page.goto("https://hotel-rooms-six.vercel.app/");

  const roomA = page.locator("li").filter({ hasText: "Budget Single Room" });

  await expect(roomA.getByLabel("current price")).toHaveText("CZK 20,490.00 ");
  await expect(roomA.getByLabel("original price")).toHaveText("CZK 12,990.00 ");
  await expect(roomA.getByText(/Availability: Available/i)).toBeVisible();
  await expect(roomA.getByRole("button", { name: "Book" })).toBeEnabled();

  const roomB = page
    .locator("li")
    .filter({ hasText: /Availability: On request/i })
    .nth(0);
  await expect(roomB.getByRole("button", { name: "Book" })).toBeDisabled();

  await page.getByLabel("Go to next page").click();
  await page.waitForURL(/page=2/);
  await page.getByLabel("Go to next page").click();
  await page.waitForURL(/page=3/);

  const roomC = await page
    .locator("li")
    .filter({ hasText: "Two Bedroom Apartment" });

  await expect(roomC.getByText(/Something went wrong/)).toBeVisible();

  await page.getByText(/From the most expensive/i).click();

  await page.waitForURL(/sort=price:desc/);

  const mostExpensiveRoom = await page.locator("li").nth(0);

  await expect(mostExpensiveRoom).toHaveText(/Penthouse Suite with Balcony/i);

  await expect(mostExpensiveRoom.getByLabel("current price")).toHaveText(
    "CZK 66,990.00 "
  );
  await expect(mostExpensiveRoom.getByLabel("original price")).toHaveText(
    "CZK 59,990.00 "
  );
});

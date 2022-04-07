import { expect, test } from "@playwright/test";

test.describe("page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should contain fast-welcome", async ({ page }) => {
        const element = page.locator("fast-welcome");
        await expect(element).not.toBeNull();
    });
});

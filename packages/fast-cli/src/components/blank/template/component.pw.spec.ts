import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
import { expect, test } from "@playwright/test";
import { fixtureURL } from "@microsoft/fast-cli/dist/esm/utilities/playwright.js";

test.describe("${config.tagName}", () => {
    const fixture = fixtureURL("${config.tagName}");

    test.beforeEach(async ({ page }) => {
        await page.goto(fixture);
    });

    test("should load the fixture URL", async ({ page }) => {
        const pageUrl = page.url();

        expect(pageUrl).toBe(\`http://localhost:3000/\${fixture}\`);
    });
    test("should contain the component in the URL", async ({ page }) => {
        const element = page.locator("${config.tagName}");

        await expect(element).not.toBeNull();
    });
});
`
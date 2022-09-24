import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { expect, test } from "@playwright/test";
import { fixtureURL } from "@microsoft/fast-cli/dist/esm/utilities/playwright.js";

test.describe("${c => c.tagName}", () => {
    const fixture = fixtureURL("${c => c.tagName}");

    test.beforeEach(async ({ page }) => {
        await page.goto(fixture);
    });

    test("should load the fixture URL", async ({ page }) => {
        const pageUrl = page.url();

        expect(pageUrl).toBe(\`http://localhost:3000/\${fixture}\`);
    });
    test("should contain the component in the URL", async ({ page }) => {
        const element = page.locator("${c => c.tagName}");

        await expect(element).not.toBeNull();
    });
});
`
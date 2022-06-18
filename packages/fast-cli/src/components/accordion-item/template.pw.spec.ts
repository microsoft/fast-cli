import { expect, test } from "@playwright/test";
import { execSync } from "child_process";
import {
    getExpectedGeneratedComponentTemplateFiles,
    setupComponent,
    teardown,
    getGeneratedComponentFiles,
    getTempDir,
    getTempComponentDir,
} from "../../test/helpers.js";

const uuid: string = "accordion-item";
const tempDir: string = getTempDir(uuid);
const tempComponentDir: string = getTempComponentDir(uuid);

test.describe(`CLI add-foundation-component ${uuid}`, () => {
    test.beforeAll(() => {
        setupComponent(uuid, tempDir, tempComponentDir);
        execSync(`cd ${tempDir} && npm i @microsoft/adaptive-ui@1.0.0-alpha.2 @microsoft/fast-foundation@3.0.0-alpha.3`);
    });
    test.afterAll(() => {
        teardown(tempDir, tempComponentDir);
    });
    test("should copy files from the template", () => {
        expect(getGeneratedComponentFiles(tempDir, uuid).sort()).toEqual(getExpectedGeneratedComponentTemplateFiles(uuid).sort());
    });
    test("should be able to run the build", () => {
        expect(
            () => {
                execSync(`cd ${tempDir} && npm run build`);
            }
        ).not.toThrow();
    });
});
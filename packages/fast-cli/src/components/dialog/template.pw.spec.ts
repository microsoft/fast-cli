import { expect, test } from "@playwright/test";
import { execSync } from "child_process";
import {
    expectedGeneratedComponentTemplateFiles,
    setupComponent,
    teardown,
    getGeneratedComponentFiles,
    getTempDir,
    getTempComponentDir,
} from "../../test/helpers.js";

const uuid: string = "dialog";
const tempDir: string = getTempDir(uuid);
const tempComponentDir: string = getTempComponentDir(uuid);

test.describe(`CLI add-foundation-component ${uuid}`, () => {
    test.beforeAll(() => {
        setupComponent(uuid, tempDir, tempComponentDir);
    });
    test.afterAll(() => {
        teardown(tempDir, tempComponentDir);
    });
    test("should copy files from the template", () => {
        expect(getGeneratedComponentFiles(tempDir)).toEqual(expectedGeneratedComponentTemplateFiles);
    });
    test("should be able to run the build", () => {
        expect(
            () => {
                execSync(`cd ${tempDir} && npm run build`);
            }
        ).not.toThrow();
    });
});
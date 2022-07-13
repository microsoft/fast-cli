import { expect, test } from "@playwright/test";
import { execSync } from "child_process";
import {
    getExpectedGeneratedComponentTemplateFiles,
    setup,
    teardown,
    getGeneratedComponentFiles,
    getTempDir,
    getTempComponentDir,
} from "../test/helpers.js";
import fs from "fs-extra";
import path from "path";

const uuid: string = "foundation-components";
const tempDir: string = getTempDir(uuid);
const tempComponentDir: string = getTempComponentDir(uuid);
const dirname = process.cwd(); // should be project root
const packagesDir = path.resolve(dirname, "./packages");

const components = fs.readdirSync(
    path.resolve(
        dirname,
        "./packages/fast-cli/src/components"
    )
).filter((component) => {
    const file = new RegExp(/\./);
    return !file.test(component);
});

function initializeTestProject(
    tempDir: string,
    tempComponentDir: string
): void {
    setup(tempDir, tempComponentDir);
    execSync(`cd ${tempDir} && fast init -t ${path.resolve(packagesDir, "cfp-template")} && npm i --save-dev ${path.resolve(packagesDir, "fast-cli")}`);
}

function setupComponent(
    tempDir: string,
    addComponentCommand: string,
) {
    execSync(`cd ${tempDir} && ${addComponentCommand}`);
}

test.describe("CLI add-foundation-component", () => {
    test.beforeAll(() => {
        initializeTestProject(tempDir, tempComponentDir);
    });
    test.afterAll(() => {
        teardown(tempDir, tempComponentDir);
    });
    components.forEach((component) => {
        test.describe(component, () => {
            test.beforeEach(() => {
                setupComponent(
                    tempDir,
                    `fast add-foundation-component -n ${component} -t ${component}`
                )
            });
            test("should copy files from the template", () => {
                expect(getGeneratedComponentFiles(tempDir, component).sort()).toEqual(getExpectedGeneratedComponentTemplateFiles(component).sort());
            });
        });
    });
    test("should be able to run the build", () => {
        expect(
            () => {
                execSync(`cd ${tempDir} && npm run build`);
            }
        ).not.toThrow();
    });
});
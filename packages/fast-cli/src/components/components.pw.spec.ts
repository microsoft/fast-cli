import { expect, test } from "@playwright/test";
import { execSync } from "child_process";
import {
    getExpectedGeneratedComponentTemplateFiles,
    setup,
    teardown,
    getGeneratedComponentFiles,
    getTempDir,
    getTempComponentDir,
    updatePackageJsonScripts,
} from "../test/helpers.js";
import { availableTemplates } from "../components/options.js";
import fs from "fs-extra";
import path from "path";

const uuidComponents: string = "foundation-components";
const uuidComponentsAll: string = "foundation-components-all";
const tempDirComponents: string = getTempDir(uuidComponents);
const tempDirComponentsAll: string = getTempDir(uuidComponentsAll);
const tempComponentDir: string = getTempComponentDir(uuidComponents);
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
    execSync(`cd ${tempDir} && npm run fast:init && npm i --save-dev ${path.resolve(packagesDir, "fast-cli")}`);
}

function execComponentCommand(
    tempDir: string,
    command: string,
) {
    updatePackageJsonScripts(tempDir, tempComponentDir);
    execSync(`cd ${tempDir} && ${command}`);
}

test.describe("CLI add-foundation-component", () => {
    test.beforeAll(() => {
        initializeTestProject(tempDirComponents, tempComponentDir);
    });
    test.afterAll(() => {
        teardown(tempDirComponents);
    });
    test.describe("--template", () => {
        components.forEach((component) => {
            test.describe(component, () => {
                test.beforeEach(() => {
                    execComponentCommand(
                        tempDirComponents,
                        `npm run fast:add-foundation-component:${component}`
                    )
                });
                test("should copy files from the template", () => {
                    expect(getGeneratedComponentFiles(tempDirComponents, component).sort()).toEqual(getExpectedGeneratedComponentTemplateFiles(component).sort());
                });
            });
        });
        test("should be able to run the build", () => {
            expect(
                () => {
                    execSync(`cd ${tempDirComponents} && npm run build`);
                }
            ).not.toThrow();
        });
    });
});

test.describe.skip("CLI add-foundation-component", () => {
    test.beforeAll(() => {
        initializeTestProject(tempDirComponentsAll, tempComponentDir);
        try {
            execComponentCommand(
                tempDirComponentsAll,
                "npm run fast:add-foundation-component:all"
            );
        } catch (e) {
            console.warn(e);
        }
    });
    test.afterAll(() => {
        teardown(tempDirComponentsAll);
    });
    test.describe("--all", () => {
        test("should have copied all foundation components", () => {
            const tempDirComponentContents = fs.readdirSync(path.resolve(tempDirComponentsAll, "./src/components"));

            availableTemplates.forEach((template) => {
                expect(tempDirComponentContents.includes(template)).toBeTruthy();
            });
        });
        test("should be able to run the build", () => {
            expect(
                () => {
                    execSync(`cd ${tempDirComponentsAll} && npm run build`);
                }
            ).not.toThrow();
        });
    });
});

import { expect, test } from "@playwright/test";
import { execSync } from "child_process";
import path from "path";
import fs from "fs-extra";
import {
    expectedGeneratedComponentTemplateFiles,
    setup,
    teardown,
    getTempDir,
    getTempComponentDir,
} from "../../test/helpers.js";

const uuid: string = "blank";
const tempDir: string = getTempDir(uuid);
const tempComponentDir: string = getTempComponentDir(uuid);

test.describe(`CLI add-foundation-component ${uuid}`, () => {
    test.beforeAll(() => {
        setup(tempDir, tempComponentDir);
        execSync(`cd ${tempDir} && npm run fast:init`);
        setup(tempDir, tempComponentDir);
        execSync(`cd ${tempDir} && npm run fast:add-foundation-component:${uuid}`);
    });
    test.afterAll(() => {
        teardown(tempDir, tempComponentDir);
    });
    test("should copy files from the template", () => {
        let files: Array<string> = [];

        function testGeneratedFiles(folderName: string) {
            const tempDirContents = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName));
            const tempDirContentsWithFileTypes = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName), {
                withFileTypes: true
            });

            for (let i = 0, contentLength = tempDirContents.length; i < contentLength; i++) {
                if (tempDirContentsWithFileTypes[i].isDirectory()) {
                    testGeneratedFiles(tempDirContents[i]);
                } else {
                    files.push(
                        folderName
                            ? `${folderName}/${tempDirContents[i]}`
                            : tempDirContents[i]
                    );
                }
            }
        }
        
        testGeneratedFiles("");
        expect(files).toEqual(expectedGeneratedComponentTemplateFiles);
    });
    test("should be able to run the build", () => {
        expect(
            () => {
                execSync(`cd ${tempDir} && npm run build`);
            }
        ).not.toThrow();
    });
});
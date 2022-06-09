import { execSync } from "child_process";
import path from "path";
import fs from "fs-extra";
import { availableTemplates } from "../components/options.js";

export const dirname = path.resolve(process.cwd(), "../"); // should point to "packages"
export const getTempDir = function(uuid: string): string {
    return path.resolve(dirname, `temp--${uuid}`);
}
export const getTempComponentDir = function(uuid: string): string {
    return path.resolve(dirname, `temp-component--${uuid}`);
}
export const fastCliDir = path.resolve(dirname, "fast-cli");

export function setup(tempDir: string, tempComponentDir: string): void {
    fs.ensureDirSync(tempDir);

    // Create a temp project
    execSync(`cd ${tempDir} && npm init -y`);

    // Install the FAST CLI
    execSync(`cd ${tempDir} && npm install --save-dev ${fastCliDir}`);

    // Update the scripts for testable CLI commands
    const packageJsonString = fs.readFileSync(path.resolve(tempDir, "package.json"), { "encoding": "utf8" });
    const packageJson = JSON.parse(packageJsonString);
    packageJson.scripts = {
        ...packageJson.scripts,
        "fast:init": `fast init -t ${path.resolve(dirname, "cfp-template")}`,
        "fast:config": `fast config -p ./components -r ./src -n test`,
        "fast:add-design-system": `fast add-design-system -s open`,
        "fast:add-component:template": `fast add-component -n test-component -t ${tempComponentDir}`,
        ...availableTemplates.reduce((prevValue, currValue: string) => {
            return {
                ...prevValue,
                [`fast:add-foundation-component:${currValue}`]: `fast add-foundation-component -n ${currValue} -t ${currValue}`
            }
        }, {}),
    };
    fs.writeFileSync(path.resolve(tempDir, "package.json"), JSON.stringify(packageJson, null, 2));
}

export function setupComponent(uuid: string, tempDir: string, tempComponentDir: string): void {
    setup(tempDir, tempComponentDir);
    execSync(`cd ${tempDir} && npm run fast:init`);
    setup(tempDir, tempComponentDir);
    execSync(`cd ${tempDir} && npm run fast:add-foundation-component:${uuid}`);
}

export function teardown(tempDir: string, tempComponentDir: string): void {
    fs.removeSync(tempDir);
    fs.removeSync(tempComponentDir);
}

export function getGeneratedComponentFiles(tempDir: string, componentName: string): Array<string> {
    const files: Array<string> = [];

    function testGeneratedFiles(folderName: string): void {
        const tempDirContents = fs.readdirSync(path.resolve(tempDir, `src/components/${componentName}`, folderName));
        const tempDirContentsWithFileTypes = fs.readdirSync(path.resolve(tempDir, `src/components/${componentName}`, folderName), {
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

    return files;
}

export const getExpectedGeneratedComponentTemplateFiles = (componentName: string): Array<string> => [
    "README.md",
    `${componentName}.definition.ts`,
    `${componentName}.pw.spec.ts`,
    `${componentName}.stories.ts`,
    `${componentName}.styles.ts`,
    `${componentName}.template.ts`,
    `${componentName}.ts`,
    "define.ts",
    "fixtures/base.html",
];
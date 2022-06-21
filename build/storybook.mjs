import { execSync } from "child_process";
import path from "path";
import fs from "fs-extra";

/**
 * This file will set up a temp directory and install all foundation components for
 * the purpose of revising them via storybook
 */

const dirname = process.cwd();
const tempDir = path.resolve(dirname, "temp/storybook");
const cfpTemplateDir = path.resolve(dirname, "packages/cfp-template");
const fastCliDir = path.resolve(dirname, "packages/fast-cli");

fs.ensureDirSync(tempDir);

// Initialize the temp repository and install the FAST CLI
execSync(
    `cd ${tempDir} && npm init -y && npm install --save-dev ${fastCliDir}`
);

// Update the scripts for CLI init command
const packageJsonStringInit = fs.readFileSync(path.resolve(tempDir, "package.json"), { "encoding": "utf8" });
const packageJsonInit = JSON.parse(packageJsonStringInit);
packageJsonInit.scripts = {
    "fast:init": `fast init -t ${cfpTemplateDir}`
};
fs.writeFileSync(path.resolve(tempDir, "package.json"), JSON.stringify(packageJsonInit, null, 2));

// Run the FAST CLI to initialize the project
execSync(
    `cd ${tempDir} && npm run fast:init`
);

// Update the scripts for CLI to add all foundation components
const packageJsonStringFoundation = fs.readFileSync(path.resolve(tempDir, "package.json"), { "encoding": "utf8" });
const packageJsonFoundation = JSON.parse(packageJsonStringFoundation);
packageJsonFoundation.scripts = {
    ...packageJsonFoundation.scripts,
    "add-components": "fast add-foundation-component --all",
    "build:tsc": "tsc"
};
fs.writeFileSync(path.resolve(tempDir, "package.json"), JSON.stringify(packageJsonFoundation, null, 2));

// re-install the FAST CLI
execSync(
    `cd ${tempDir} && npm install --save-dev ${fastCliDir}`
);

// Run the FAST CLI to add the foundation components
execSync(
    `cd ${tempDir} && npm run add-components`
);

// Build the js files
execSync(
    `cd ${tempDir} && npm run build:tsc`
);

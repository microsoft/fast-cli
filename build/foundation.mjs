import { execSync } from "child_process";
import path from "path";
import fs from "fs-extra";
import { availableTemplates } from "@microsoft/fast-cli/dist/esm/components/options.js";

/**
 * This file will set up a temp directory and install all foundation components for
 * the purpose of revising them via storybook
 */

const dirname = process.cwd();
const tempDir = path.resolve(dirname, "temp/foundation");
const cfpTemplateDir = path.resolve(dirname, "packages/cfp-template");
const fastCliDir = path.resolve(dirname, "packages/fast-cli");

const commandLineArgs = process.argv.slice(2);

function setupProject() {
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
}

function updateFoundationComponent(components) {
    // Check these are all valid foundation components
    components.forEach((component) => {
        if (!availableTemplates.includes(component)) {
            throw new Error(`The component ${component} does not exist as a foundation component`);
        }
    });

    // Re-copy the foundation templates
    components.forEach((component) => {
        execSync(`cd ${tempDir} && fast add-foundation-component -t ${component} -n ${component}`);
    });
}

function getIndexOfCommandArgs(argSubset, prevArg = 0, commandArgsIndex = []) {
    const nextArgIndex = argSubset.findIndex((arg) => {
        return arg.includes("-");
    });

    if (nextArgIndex === -1) {
        return commandArgsIndex;
    }
    commandArgsIndex.push(nextArgIndex + prevArg);

    return getIndexOfCommandArgs(argSubset.slice(nextArgIndex + 1), prevArg + nextArgIndex + 1,commandArgsIndex);
}

function runCommandArgs(indexOfCommandArgs) {
    indexOfCommandArgs.forEach((commandArgIndex, index) => {
        switch (commandLineArgs[commandArgIndex]) {
            case "-c":
                updateFoundationComponent(
                    commandLineArgs.slice(
                        commandArgIndex + 1,
                        indexOfCommandArgs[index + 1] || void 0
                    )
                );
                break;
            default:
                console.error(`No command arg found for: ${commandLineArgs[commandArgIndex]}`);
        }
    })
}

/**
 * Commands may be passed by running this script.
 * 
 * Directly running the script:
 * node ./build/foundation.mjs -c avatar button
 * 
 * Using the npm scripts:
 * npm run build:foundation -- -c avatar button
 */
if (commandLineArgs.length > 0) {
    const indexOfCommandArgs = getIndexOfCommandArgs(commandLineArgs);
    runCommandArgs(indexOfCommandArgs);
} else {
    setupProject();
}


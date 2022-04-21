#!/usr/bin/env node

import { exec } from "child_process";
import path from "path";
import * as commander from "commander";
import prompts from "prompts";
import spawn from "cross-spawn";
import fs from "fs-extra";
import type { FastConfig, FastInit, PackageJson } from "./cli.options";

const __dirname = path.resolve(path.dirname(""));
const program = new commander.Command();
const defaultTemplatePath = path.resolve(__dirname, "@microsoft/cfp-template");
const defaultTemplateFolderName = "template";
/* eslint-disable no-useless-escape */
const folderMatches = process.cwd().match(/[^(\\|\/)]+(?=$)/);
const ascii = `

  ███████╗ █████╗ ███████╗████████╗     ██████╗██╗     ██╗
  ██╔════╝██╔══██╗██╔════╝╚══██╔══╝    ██╔════╝██║     ██║
  █████╗  ███████║███████╗   ██║       ██║     ██║     ██║
  ██╔══╝  ██╔══██║╚════██║   ██║       ██║     ██║     ██║
  ██║     ██║  ██║███████║   ██║       ╚██████╗███████╗██║
  ╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝        ╚═════╝╚══════╝╚═╝
           A creation tool for FAST projects

`;

/**
 * Init command options
 */
interface InitOptions {
    /**
     * Use defaults
     */
    defaults: boolean;

    /**
     * Path to template
     */
    template: string;
}

/**
 * Setup the CLI
 */
program.name("fast").description(ascii);

/**
 * Check to see if we can reach the npm repository within a timeout
 */
function checkNpmRegistryIsAvailable(): Promise<boolean | unknown> {
    return new Promise(resolve => {
        resolve(
            new Promise(resolve => {
                exec("npm ping", { timeout: 1000 }, error => {
                    resolve(error === null);
                });
            }).catch((reason) => {
                throw reason;
            })
        );
    }).catch((reason) => {
        throw reason;
    });
}

/**
 * Get the fastinit.json file
 */
function getFastInitFile(
    pathToTemplatePackage: string
): Promise<FastInit> {
    return new Promise<FastInit>((resolve, reject) => {
        const templateDir = path.resolve(
            __dirname,
            "node_modules",
            pathToTemplatePackage,
            defaultTemplateFolderName
        );

        resolve(JSON.parse(
            fs.readFileSync(path.resolve(templateDir, "fastinit.json"), {
                encoding: "utf8",
            })
        ) as FastInit);
    }).catch((reason) => {
        throw reason;
    });
}

/**
 * Copy the template to the project
 */
function copyTemplateToProject(
    pathToTemplatePackage: string,
    packageJson: PackageJson,
): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const templateDir = path.resolve(
            __dirname,
            "node_modules",
            pathToTemplatePackage,
            defaultTemplateFolderName
        );
        const destDir = path.resolve(__dirname);

        // Copy all files in the template folder
        fs.copySync(
            templateDir,
            destDir,
            {
                overwrite: true,
            },
            (error: string) => {
                if (error) {
                    throw new Error(error);
                }
            }
        );

        const packageName = folderMatches !== null ? folderMatches[0] : packageJson.name;
        fs.writeJsonSync(path.resolve(destDir, "package.json"), {
            ...packageJson,
            name: packageName
        }, {
            spaces: 2,
        });

        resolve(packageName);
    }).catch((reason) => {
        throw reason;
    });
}

/**
 * Install package dependencies for the template
 */
function installDependencies(): Promise<unknown> {
    return new Promise((resolve, reject) => {
        const args = ["install"];
        const child = spawn("npm", args, { stdio: "inherit" });
        child.on("close", code => {
            if (code !== 0) {
                reject({
                    command: "npm install",
                });
                return;
            }
            resolve(void 0);
        });
    }).catch((reason) => {
        throw reason;
    });
}

/**
 * Install playwright browsers
 */
function installPlaywrightBrowsers(): Promise<unknown> {
    return new Promise((resolve, reject) => {
        const args = ["playwright", "install"];
        const child = spawn("npx", args, { stdio: "inherit" });
        child.on("close", code => {
            if (code !== 0) {
                reject({
                    command: "npx playwright install",
                });
                return;
            }
            resolve(void 0);
        });
    }).catch((reason) => {
        throw reason;
    });
}

/**
 * Install a package holding a template from npm
 */
function installTemplate(pathToTemplate: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
        const args = [
            "install",
            pathToTemplate,
        ];
        const child = spawn("npm", args, { stdio: "inherit" });
        child.on("close", code => {
            if (code !== 0) {
                reject({
                    command: "npm install",
                });
                return;
            }
            resolve(void 0);
        });
    }).catch((reason) => {
        throw reason;
    });
}

function createConfigFile(
    fastConfig: FastConfig,
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        fs.writeJsonSync(path.resolve(process.cwd(), "fastconfig.json"), {
            ...fastConfig
        }, {
            spaces: 2,
        });

        resolve();
    }).catch((reason) => {
        throw reason;
    });
}

/**
 * Uninstall a package holding a template
 */
function uninstallTemplate(packageName: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
        const args = [
            "uninstall",
            packageName,
        ];
        const child = spawn("npm", args, { stdio: "inherit" });
        child.on("close", code => {
            if (code !== 0) {
                reject({
                    command: "npm uninstall",
                });
                return;
            }
            resolve(void 0);
        });
    }).catch((reason) => {
        throw reason;
    });
}

/**
 * Initialize a FAST project
 */
async function init(options: InitOptions): Promise<void> {
    let pathToTemplatePackage = options.template;

    if (options.template) {
        pathToTemplatePackage = path.resolve(__dirname, options.template);
    } else {
        if (await checkNpmRegistryIsAvailable()) {
            pathToTemplatePackage = defaultTemplatePath;
        } else {
            throw new Error("The npm registry cannot be reached.");
        }
    }

    if (!options.template) {
        /**
         * Collect information for the package.json file
         */
         pathToTemplatePackage = await prompts([
            {
                type: "text",
                name: "template",
                initial: defaultTemplatePath,
                message: "Template path or package name",
            }
        ]).template;
    }

    const initFile: FastInit = await getFastInitFile(pathToTemplatePackage);
    await installTemplate(pathToTemplatePackage);
    await createConfigFile(initFile.fastConfig);
    const packageName: string = await copyTemplateToProject(pathToTemplatePackage, initFile.packageJson);
    await installDependencies();
    await installPlaywrightBrowsers();
    await uninstallTemplate(packageName);
}

program
    .command("init")
    .description("Initialize a new project")
    .option("-t, --template <template>", "Path to project template")
    .action(async (options): Promise<void> => {
        await init(options).catch((reason) => {
            throw reason;
        });
    });

program.parse(process.argv);

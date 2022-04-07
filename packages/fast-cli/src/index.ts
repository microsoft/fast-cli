#!/usr/bin/env node

import { exec } from "child_process";
import path from "path";
import * as commander from "commander";
import prompts from "prompts";
import spawn from "cross-spawn";
import fs from "fs-extra";
import { defaultPackageJsonConfig, PackageJsonConfig } from "./index.options.js";

const __dirname = path.resolve(path.dirname(""));
const program = new commander.Command();
const defaultTemplatePath = path.resolve(__dirname, "@microsoft/cfp-template");
const defaultTemplateFolderName = "template";
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
function checkNpmRegistryIsAvailable(): Promise<boolean> {
    return new Promise(resolve => {
        resolve(
            new Promise(resolve => {
                exec("npm ping", { timeout: 1000 }, error => {
                    resolve(error === null);
                });
            })
        );
    });
}

/**
 * Copy the template to the project
 */
function copyTemplateToProject(
    packageJson: PackageJsonConfig,
    pathToTemplatePackage: string
): Promise<void> {
    return new Promise((resolve, reject) => {
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

        // Update the package.json with the user response
        const templateConfigPackageJsonFileContents = JSON.parse(
            fs.readFileSync(path.resolve(templateDir, "fastconfig.json"), {
                encoding: "utf8",
            })
        ).packageJson;
        const packageJsonFileContents: { [key: string]: any } = packageJson;
        packageJsonFileContents["repository"] = {
            type: "git",
            url: packageJson["repository"],
        };
        [
            "dependencies",
            "devDependencies",
            "peerDependencies",
            "scripts",
            "main",
        ].forEach(property => {
            packageJsonFileContents[property] = templateConfigPackageJsonFileContents[property];
        });

        fs.writeJsonSync(path.resolve(destDir, "package.json"), packageJsonFileContents, {
            spaces: 2,
        });

        resolve();
    });
}

/**
 * Install package dependencies for the template
 */
function installDependencies(): Promise<void> {
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
            resolve();
        });
    });
}

/**
 * Install playwright browsers
 */
function installPlaywrightBrowsers(): Promise<void> {
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
            resolve();
        });
    });
}

/**
 * Install a package holding a template from npm
 */
function installTemplate(pathToTemplate: string): Promise<void> {
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
            resolve();
        });
    });
}

/**
 * Initialize a FAST project
 */
async function init(options: InitOptions): Promise<void> {
    let packageJson = defaultPackageJsonConfig;
    let pathToTemplatePackage;

    if (options.template) {
        pathToTemplatePackage = path.resolve(__dirname, options.template);
    } else {
        if (await checkNpmRegistryIsAvailable()) {
            pathToTemplatePackage = defaultTemplatePath;
        } else {
            throw new Error("The npm registry cannot be reached.");
        }
    }

    if (!options.defaults) {
        /**
         * Collect information for the package.json file
         */
        packageJson = await prompts([
            {
                type: "text",
                name: "name",
                initial: defaultPackageJsonConfig.name,
                message: "project name",
            },
            {
                type: "text",
                name: "version",
                initial: defaultPackageJsonConfig.version,
                message: "version",
            },
            {
                type: "text",
                name: "description",
                message: "description",
            },
            {
                type: "text",
                name: "repository",
                message: "git repository",
            },
            {
                type: "text",
                name: "keywords",
                message: "keywords",
            },
            {
                type: "text",
                name: "author",
                message: "author",
            },
            {
                type: "text",
                name: "license",
                initial: defaultPackageJsonConfig.license,
                message: "license",
            },
        ]);
    }

    await installTemplate(pathToTemplatePackage);
    await copyTemplateToProject(packageJson, pathToTemplatePackage);
    await installDependencies();
    await installPlaywrightBrowsers();
}

(function (): void {
    program
        .command("init")
        .description("Initialize a new project")
        .option("-d, --defaults", "Use defaults")
        .option("-t, --template <template>", "Path to project template")
        .action((options): void => {
            init(options).catch((reason) => {
                throw reason;
            });
        });

    program.parse(process.argv);
})();

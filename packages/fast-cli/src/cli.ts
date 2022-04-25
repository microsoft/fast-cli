#!/usr/bin/env node

import path from "path";
import * as commander from "commander";
import prompts from "prompts";
import spawn from "cross-spawn";
import fs from "fs-extra";
import type { AddDesignSystemOptionMessages, AddDesignSystemOptions, FastConfig, FastConfigOptionMessages, FastInit, FastInitOptionMessages, PackageJson } from "./cli.options";

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
 * Config command options
 */
interface ConfigOptions {
    /**
     * The component path
     */
    componentPath: string;
}

/**
 * Setup the CLI
 */
program.name("fast").description(ascii);

/**
 * Get the fastinit.json file
 */
function getFastInitFile(
    pathToTemplatePackage: string
): FastInit {
    const templateDir = path.resolve(
        __dirname,
        "node_modules",
        pathToTemplatePackage,
        defaultTemplateFolderName
    );

    return JSON.parse(
        fs.readFileSync(path.resolve(templateDir, "fastinit.json"), {
            encoding: "utf8",
        })
    );
}

/**
 * Copy the template to the project
 */
function copyTemplateToProject(
    pathToTemplatePackage: string,
    packageJson: PackageJson,
): string {
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

    return packageName;
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
): void {
    fs.writeJsonSync(path.resolve(process.cwd(), "fastconfig.json"), {
        ...fastConfig
    }, {
        spaces: 2,
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

async function createDesignSystemFile(
    designSystemOptions: AddDesignSystemOptions,
): Promise<void> {
    const fastConfigPath = path.resolve(process.cwd(), "fastconfig.json");

    if (!await fs.pathExists(fastConfigPath)) {
        throw new Error("fastconfig.json file does not exist, run the config command to generate this file.");
    }

    const fastConfig = JSON.parse(fs.readFileSync(fastConfigPath, { encoding: "utf8" }));

    if (typeof fastConfig.componentPath !== "string") {
        throw new Error("fastconfig.json file does not contain a component path, add a component path to generate a design system file.");
    }

    fs.ensureDirSync(path.resolve(fastConfig.componentPath, "../"));
    fs.writeFileSync(path.resolve(fastConfig.componentPath, "../design-system.ts"),
        `export const designSystem = {` +
        `    prefix: "${designSystemOptions.prefix}",` +
        `    shadowRootMode: "${designSystemOptions.shadowRootMode}",` +
        `}`
    );
}

/**
 * Add a design system
 */
async function addDesignSystem(
    options: AddDesignSystemOptions,
    messages: AddDesignSystemOptionMessages
): Promise<void> {
    const config: AddDesignSystemOptions = options;

    if (!options.prefix) {
        config.prefix = await prompts([
            {
                type: "text",
                name: "prefix",
                message: messages.prefix,
                validate: (input): boolean => {
                    return input !== "";
                }
            }
        ]).prefix;
    }

    if (!options.shadowRootMode) {
        config.shadowRootMode = await prompts([
            {
                type: "toggle",
                name: "shadowRootMode",
                message: messages.shadowRootMode,
                initial: true,
                active: "open",
                inactive: "closed",
            }
        ]).shadowRootMode;
    }

    await createDesignSystemFile(config).catch((reason) => {
        throw reason;
    });
}

/**
 * Configure a FAST project
 */
async function config(options: ConfigOptions, messages: FastConfigOptionMessages): Promise<void> {
    const config: ConfigOptions = options;

    if (!options.componentPath) {
        /**
         * Collect information for the fastconfig.json file
         */
        config.componentPath = await prompts([
            {
                type: "text",
                name: "componentPath",
                message: messages.componentPath

            }
        ]).componentPath;
    }

    createConfigFile(config);
}

/**
 * Determine if the template is local or remote
 */
async function isTemplateRemotePackage(pathToTemplatePackage: string): Promise<boolean> {
    const localPath = path.resolve(__dirname, pathToTemplatePackage);

    return await fs.pathExists(localPath)
}

/**
 * Initialize a FAST project
 */
async function init(options: InitOptions, messages: FastInitOptionMessages): Promise<void> {
    let pathToTemplatePackage = options.template;

    if (!options.template) {
        /**
         * Collect information for the package.json file
         */
        pathToTemplatePackage = await prompts([
            {
                type: "text",
                name: "template",
                initial: defaultTemplatePath,
                message: messages.template,
            }
        ]).template;
    }

    if (!await isTemplateRemotePackage(pathToTemplatePackage)) {
        pathToTemplatePackage = path.resolve(__dirname, options.template);
    }

    const initFile: FastInit = getFastInitFile(pathToTemplatePackage);
    await installTemplate(pathToTemplatePackage);
    createConfigFile(initFile.fastConfig);
    const packageName: string = copyTemplateToProject(pathToTemplatePackage, initFile.packageJson);
    await installDependencies();
    await installPlaywrightBrowsers();
    await uninstallTemplate(packageName);
}

const initTemplateMessage: string = "Project template";

program
    .command("init")
    .description("Initialize a new project")
    .option("-t, --template <template>", initTemplateMessage)
    .action(async (options): Promise<void> => {
        await init(options, {
            template: initTemplateMessage
        }).catch((reason) => {
            throw reason;
        });
    });

const configComponentPathMessage: string = "Path to component folder";

program.command("config")
    .description("Configure a project")
    .option("-p, --component-path <path/to/components>", configComponentPathMessage)
    .action(async (options): Promise<void> => {
        await config(options, {
            componentPath: configComponentPathMessage
        }).catch((reason) => {
            throw reason;
        });
    });

const addDesignSystemPrefixMessage: string = "The web component prefix";
const addDesignSystemShadowRootModeMessage: string = "The shadowroot mode";

program.command("add-design-system")
    .description("Add a design system")
    .option("-p, --prefix <prefix>", addDesignSystemPrefixMessage)
    .option("-s, --shadow-root-mode <mode>", addDesignSystemShadowRootModeMessage)
    .action(async (options): Promise<void> => {
        await addDesignSystem(options, {
            prefix: addDesignSystemPrefixMessage,
            shadowRootMode: addDesignSystemShadowRootModeMessage,
        }).catch((reason) => {
            throw reason;
        });
    });

program.parse(process.argv);

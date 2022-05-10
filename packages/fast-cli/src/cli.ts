#!/usr/bin/env node

import path from "path";
import * as commander from "commander";
import prompts from "prompts";
import spawn from "cross-spawn";
import fs from "fs-extra";
import type { AddComponentOptionMessages, AddComponentOptions, AddDesignSystemOptionMessages, AddDesignSystemOptions, AddFoundationComponentOptionMessages, AddFoundationComponentOptions, FastConfig, FastConfigOptionMessages, FastInit, FastInitOptionMessages, PackageJsonAddComponent, PackageJsonInit } from "./cli.options.js";
import { requiredComponentTemplateFiles } from "./components/files.js";
import { componentTemplateFileNotFoundMessage, componentTemplateFilesNotFoundMessage, fastConfigDoesNotContainComponentPathMessage, fastConfigDoesNotExistErrorMessage } from "./cli.errors.js";
import type { XOR } from "./cli.types.js";
import type { ComponentTemplateConfig } from "./utilities/template.js";
import { availableTemplates } from "./components/options.js";

const __dirname = path.resolve(path.dirname(""));
const program = new commander.Command();
const defaultTemplatePath = path.resolve(__dirname, "@microsoft/cfp-template");
const cliPath = path.resolve(__dirname, "node_modules", "@microsoft/fast-cli");
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

function getPackageName(packageJson: XOR<PackageJsonInit, PackageJsonAddComponent>): string {
    const packageName = folderMatches !== null
        ? folderMatches[0]
        : typeof packageJson.name === "string"
        ? packageJson.name
        : "";

    return packageName;
}

/**
 * Copy the template to the project
 */
function copyTemplateToProject(
    pathToTemplatePackage: string,
    packageJson: XOR<PackageJsonInit, PackageJsonAddComponent>,
    destDir: string
): string {
    const templateDir = path.resolve(
        __dirname,
        "node_modules",
        pathToTemplatePackage,
        defaultTemplateFolderName
    );

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

    // Update the package.json file
    const packageName = getPackageName(packageJson);
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

async function getFastConfig(): Promise<FastConfig> {
    const fastConfigPath = path.resolve(process.cwd(), "fastconfig.json");

    if (!await fs.pathExists(fastConfigPath)) {
        throw new Error(fastConfigDoesNotExistErrorMessage);
    }

    const fastConfig = JSON.parse(fs.readFileSync(fastConfigPath, { encoding: "utf8" }));

    if (typeof fastConfig.componentPath !== "string") {
        throw new Error(fastConfigDoesNotContainComponentPathMessage);
    }

    return fastConfig;
}

async function createDesignSystemFile(
    designSystemOptions: AddDesignSystemOptions,
): Promise<void> {
    const fastConfig = await getFastConfig();

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

async function checkTemplateForFiles(pathToTemplatePackage: string): Promise<void> {
    const templateDir = path.resolve(
        __dirname,
        "node_modules",
        pathToTemplatePackage,
        defaultTemplateFolderName
    );
    const directoryContents = fs.readdirSync(templateDir);

    if (!Array.isArray(directoryContents)) {
        throw new Error(componentTemplateFilesNotFoundMessage);
    }

    // Run through available template files and make sure all required files are accounted for
    for (const [templateFile, ] of Object.entries(requiredComponentTemplateFiles)) {
        if (!directoryContents.includes(templateFile)) {
            throw new Error(`${componentTemplateFileNotFoundMessage}: ${templateFile}`);
        }
    }
}

function toPascalCase(kabobCase: string): string {
    return `${kabobCase}`
        .replace(new RegExp(/[-]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
            new RegExp(/\s+(.)(\w*)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
        )
        .replace(new RegExp(/\w/), s => s.toUpperCase());
}

async function writeTemplateFiles(fastConfig: FastConfig, pathToTemplatePackage: string, cliTemplate: boolean, name: string): Promise<void> {
    const normalizedPathToTemplatePackage: string = cliTemplate
        ? path.resolve(
            cliPath,
            `dist/esm/components/${pathToTemplatePackage}`)
        : pathToTemplatePackage;

    // Ensure there is an empty directory with the provided name
    fs.emptydirSync(path.resolve(fastConfig.componentPath, name));

    // Create an array of template items based on the files.ts
    for (const [templateName, fileName] of Object.entries(requiredComponentTemplateFiles)) {
        const { default: template } = await import(`${normalizedPathToTemplatePackage}/template/${templateName}`);
        const filePath = path.resolve(fastConfig.componentPath, name, fileName(name));

        fs.ensureFileSync(filePath);
        fs.writeFileSync(
            filePath,
            template({ tagName: name, className: toPascalCase(name) })
        );
    }
}

/**
 * Add a "blank" component or component from a npm package or local template
 */
async function addComponent(
    options: AddComponentOptions,
    messages: AddComponentOptionMessages,
): Promise<void> {
    const config: AddComponentOptions = options;

    if (!options.template) {
        config.template = await prompts([
            {
                type: "text",
                name: "template",
                message: messages.template
            }
        ]).template;
    }

    if (!options.name) {
        config.name = await prompts([
            {
                type: "text",
                name: "name",
                message: messages.name
            }
        ]).name;
    }

    const fastConfig: FastConfig = await getFastConfig();

    await installTemplate(options.template as string);
    await checkTemplateForFiles(options.template as string);
    await writeTemplateFiles(fastConfig, options.template as string, false, options.name as string);
    await uninstallTemplate(options.template as string);

    // await installDependencies(); // TODO: investigate adding this for foundation using fast.add-component.json
}

/**
 * Add a foundation component
 */
async function addFoundationComponent(
    options: AddFoundationComponentOptions,
    messages: AddFoundationComponentOptionMessages,
): Promise<void> {
    const config: AddFoundationComponentOptions = options;

    if (!options.template) {
        config.template = await prompts([
            {
                type: "autocomplete",
                name: "template",
                message: messages.template,
                choices: availableTemplates.map((availableTemplate) => {
                    return {
                        title: availableTemplate
                    };
                })
            }
        ]).template;
    }

    if (!options.name) {
        config.name = await prompts([
            {
                type: "text",
                name: "name",
                message: messages.name,
                initial: config.template
            }
        ]).name;
    }

    const fastConfig: FastConfig = await getFastConfig();
    await writeTemplateFiles(fastConfig, options.template as string, true, options.name as string);

    // await installDependencies(); // TODO: investigate adding this for foundation using fast.add-component.json
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
    const packageName: string = copyTemplateToProject(pathToTemplatePackage, initFile.packageJson, path.resolve(__dirname));
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

const addComponentTemplateMessage = "The package containing a component template";
const addComponentNameMessage = "The name of the component";

program.command("add-component")
    .description("Add a component")
    .option("-t, --template <template>", addComponentTemplateMessage)
    .option("-n, --name <name>", addComponentNameMessage)
    .action(async (options): Promise<void> => {
        await addComponent(options, {
            template: addComponentTemplateMessage,
            name: addComponentNameMessage,
        }).catch((reason) => {
            throw reason;
        })
    });

const addFoundationComponentTemplateMessage = "The name of the foundation component template";
const addFoundationComponentNameMessage = "The name of the component";

program.command("add-foundation-component")
    .description("Add a foundation component")
    .option("-t, --template <template>", addFoundationComponentTemplateMessage)
    .option("-n, --name <name>", addFoundationComponentNameMessage)
    .action(async (options): Promise<void> => {
        await addFoundationComponent(options, {
            template: addFoundationComponentTemplateMessage,
            name: addFoundationComponentNameMessage,
        }).catch((reason) => {
            throw reason;
        })
    });

program.parse(process.argv);

export { ComponentTemplateConfig };
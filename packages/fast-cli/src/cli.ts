#!/usr/bin/env node

import path from "path";
import * as commander from "commander";
import prompts from "prompts";
import spawn from "cross-spawn";
import fs from "fs-extra";
import type { AddComponentOptionMessages, AddComponentOptions, AddDesignSystemOptionMessages, AddDesignSystemOptions, AddFoundationComponentOptionMessages, AddFoundationComponentOptions, FastAddComponent, FastConfig, FastConfigOptionMessages, FastInit, FastInitOptionMessages, PackageJsonAddComponent, PackageJsonInit, RequiredComponents, RequiredComponentsNameModifierConfig } from "./cli.options.js";
import { requiredComponentTemplateFiles } from "./components/files.js";
import { componentTemplateFileNotFoundMessage, componentTemplateFilesNotFoundMessage, fastAddComponentRequiredComponentMissingNameModificatierMessage, fastConfigDoesNotContainComponentPathMessage, fastConfigDoesNotExistErrorMessage } from "./cli.errors.js";
import type { XOR } from "./cli.types.js";
import type { ComponentTemplateConfig } from "./utilities/template.js";
import { disallowedTemplateNames, suggestedTemplates } from "./components/options.js";

const __dirname = path.resolve(path.dirname(""));
const program = new commander.Command();
const defaultTemplatePath = "@microsoft/cfp-template";
const cliPath = path.resolve(__dirname, "node_modules", "@microsoft/fast-cli");
const templateFolderName = "template";
/* eslint-disable no-useless-escape */
const folderMatches = __dirname.match(/[^(\\|\/)]+(?=$)/);
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
    useDefaults: boolean;

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
     * Use defaults
     */
    useDefaults: boolean;

    /**
     * The component path
     */
    componentPath: string;

    /**
     * The root directory
     */
    rootDir: string;

    /**
     * The web components prefix
     */
     componentPrefix: string;
}

/**
 * Setup the CLI
 */
program.name("fast").description(ascii);

/**
 * Get the fast.init.json file
 */
function getFastInit(
    pathToTemplatePackage: string
): FastInit {
    const templateDir = path.resolve(
        __dirname,
        "node_modules",
        pathToTemplatePackage,
        templateFolderName
    );

    return JSON.parse(
        fs.readFileSync(path.resolve(templateDir, "fast.init.json"), {
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
        templateFolderName
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
 * Install an npm dependency
 */
function installEnumeratedDependencies(dependencies?: Array<string>, devDependencies?: Array<string>): Promise<unknown> {
    const getDependencyCommand = (listOfDependencies: Array<string>, modifier?: string): Promise<unknown> => {
        return new Promise((resolve, reject) => {
            const args = modifier
                ? [
                    "install",
                    modifier,
                    ...listOfDependencies
                ]
                : [
                    "install",
                    ...listOfDependencies
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
    const installers: Array<Promise<unknown>> = [];

    if (dependencies) {
        installers.push(
            getDependencyCommand(dependencies)
        );
    }

    if (devDependencies) {
        installers.push(
            getDependencyCommand(devDependencies, "--save-dev")
        );
    }

    return Promise.all(installers).then(() => {
        Promise.resolve();
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
                reject("npm install");
                return;
            }
            resolve(void 0);
        });
    }).catch((reason) => {
        throw new Error(reason);
    });
}

function createConfigFile(
    fastConfig: FastConfig,
): void {
    fs.writeJsonSync(path.resolve(__dirname, "fast.config.json"), {
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
    const fastConfigPath = path.resolve(__dirname, "fast.config.json");

    if (!await fs.pathExists(fastConfigPath)) {
        throw new Error(fastConfigDoesNotExistErrorMessage());
    }

    const fastConfig = JSON.parse(fs.readFileSync(fastConfigPath, { encoding: "utf8" }));

    if (typeof fastConfig.componentPath !== "string") {
        throw new Error(fastConfigDoesNotContainComponentPathMessage());
    }

    return fastConfig;
}

async function getFastAddComponent(pathToTemplatePackage: string): Promise<FastAddComponent> {
    const templateDir = path.resolve(
        __dirname,
        "node_modules",
        pathToTemplatePackage,
        templateFolderName
    );

    return JSON.parse(
        fs.readFileSync(path.resolve(templateDir, "fast.add-component.json"), {
            encoding: "utf8",
        })
    );
}

async function createDesignSystemFile(
    designSystemOptions: AddDesignSystemOptions,
): Promise<void> {
    const fastConfig = await getFastConfig();
    const rootDir = fastConfig.rootDir ? fastConfig.rootDir : "";

    fs.ensureDirSync(path.resolve(rootDir, fastConfig.componentPath));
    fs.writeFileSync(path.resolve(rootDir, "design-system.ts"),
        `import { DesignSystem } from "@microsoft/fast-foundation";\n` +
        `import components from "${fastConfig.componentPath}/index.js";\n\n` +
        `export const designSystem = {\n` +
        `    prefix: "${fastConfig.componentPrefix}",\n` +
        `    shadowRootMode: "${designSystemOptions.shadowRootMode}",\n` +
        `};\n\n` +
        `DesignSystem.getOrCreate().withPrefix(\n` +
        `    designSystem.prefix\n` +
        `).register(\n` +
        `    ...components\n` +
        `);`
    );

    ensureComponentExportFile(fastConfig, rootDir);
}

function ensureComponentExportFile(fastConfig: FastConfig, rootDir: string): void {
    const filePath: string = path.resolve(rootDir, fastConfig.componentPath, "index.ts");

    try {
        const fileContents = fs.readFileSync(filePath);

        if (!fileContents) {
            throw new Error("Component export file not found.");
        }
    } catch (e) {
        console.warn(e);

        fs.writeFileSync(
            filePath,
            `export default [];`
        );
    }
}

/**
 * Add a design system
 */
async function addDesignSystem(
    options: AddDesignSystemOptions,
    messages: AddDesignSystemOptionMessages,
    defaults: Partial<AddDesignSystemOptions>,
): Promise<void> {
    let config: AddDesignSystemOptions = options;

    if (options.useDefaults) {
        config = { ...defaults, ...options };
    }

    if (!config.shadowRootMode) {
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
        templateFolderName
    );
    const directoryContents = fs.readdirSync(templateDir);

    if (!Array.isArray(directoryContents)) {
        throw new Error(componentTemplateFilesNotFoundMessage());
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

function toCamelCase(kabobCase: string): string {
    const pascalCase: string = toPascalCase(kabobCase);
    return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
}

async function writeTemplateFiles(fastConfig: FastConfig, pathToTemplatePackage: string, cliTemplate: boolean, name: string): Promise<void> {
    const rootDir = fastConfig.rootDir ? fastConfig.rootDir : "";
    const normalizedPathToTemplatePackage: string = cliTemplate
        ? `./components/${
            pathToTemplatePackage
        }`
        : path.relative(cliPath, pathToTemplatePackage);

    // Ensure there is an empty directory with the provided name
    fs.emptydirSync(path.resolve(rootDir, fastConfig.componentPath, name));

    // Create an array of template items based on the files.ts
    for (const [templateName, fileName] of Object.entries(requiredComponentTemplateFiles)) {
        const { default: template } = await import(
            `${normalizedPathToTemplatePackage}/template/${templateName}`
        );
        const filePath = path.resolve(rootDir, fastConfig.componentPath, name, fileName(name));

        fs.ensureFileSync(filePath);
        fs.writeFileSync(
            filePath,
            template({
                tagName: name,
                className: toPascalCase(name),
                definitionName: `${toCamelCase(name)}Definition`,
                componentPrefix: fastConfig.componentPrefix,
            } as ComponentTemplateConfig)
        );
    }
}

/**
 * Add a component from a npm package or local template
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
    const fastAddComponent: FastAddComponent = await getFastAddComponent(
        options.template as string
    );
    await installEnumeratedDependencies(
        Object.entries(fastAddComponent?.packageJson?.dependencies || {}).map(([key, value]: [string, string]): string => {
            return `${key}@${value}`;
        }),
        Object.entries(fastAddComponent?.packageJson?.devDependencies || {}).map(([key, value]: [string, string]): string => {
            return `${key}@${value}`;
        }),
    );
}

function modifyName(
    name: string,
    modifierConfig: RequiredComponentsNameModifierConfig
): string {
    let updatedName = name;

    if (modifierConfig.append) {
        updatedName = updatedName + modifierConfig.append;
    }

    if (modifierConfig.prepend) {
        updatedName = modifierConfig.prepend + updatedName;
    }

    if (name === updatedName) {
        throw new Error(fastAddComponentRequiredComponentMissingNameModificatierMessage(name));
    }

    return updatedName;
}

/**
 * Gets a foundation component name that will not cause naming conflicts
 */
async function getAllowedFoundationComponentName(name: string, template: string): Promise<string> {
    const updatedName: string = await prompts([
        {
            type: "text",
            name: "name",
            message: `The name "${name}" is not allowed, choose a different name`,
            initial: template
        }
    ]).name;

    if (disallowedTemplateNames.includes(updatedName)) {
        return await getAllowedFoundationComponentName(updatedName, template);
    }

    return updatedName;
}

/**
 * Add a foundation component
 */
async function addFoundationComponent(
    options: AddFoundationComponentOptions,
    messages: AddFoundationComponentOptionMessages,
): Promise<void> {
    const config: AddFoundationComponentOptions = options;

    if (options.all) {
        suggestedTemplates.forEach(async (template: string) => {
            await addFoundationComponent({
                template,
                name: template,
            },
            messages)
        });
    } else {
        if (!config.template) {
            config.template = await prompts([
                {
                    type: "autocomplete",
                    name: "template",
                    message: messages.template,
                    choices: suggestedTemplates.map((suggestedTemplate) => {
                        return {
                            title: suggestedTemplate
                        };
                    })
                }
            ]).template;
        }
    
        if (options.useDefaults) {
            // the foundation templates names are used as defaults
            config.name = config.template
        }
    
        if (!config.name) {
            config.name = await prompts([
                {
                    type: "text",
                    name: "name",
                    message: messages.name,
                    initial: config.template
                }
            ]).name;
        }
    
        if (disallowedTemplateNames.includes(config.name as string)) {
            config.name = await getAllowedFoundationComponentName(
                config.name as string,
                config.template as string
            );
        }

        const fastConfig: FastConfig = await getFastConfig();
        await writeTemplateFiles(fastConfig, config.template as string, true, config.name as string);
        const fastAddComponent: FastAddComponent = await getFastAddComponent(
            path.resolve(
                cliPath,
                "dist",
                "esm",
                "components",
                config.template as string
            )
        );

        if (Array.isArray(fastAddComponent.requiredComponents)) {
            fastAddComponent.requiredComponents.forEach(async (requiredComponent: RequiredComponents) => {
                await addFoundationComponent({
                    ...options,
                    name: modifyName(config.name as string, requiredComponent.nameModifier),
                    template: requiredComponent.template,
                }, messages);
            });
        }

        await installEnumeratedDependencies(
            Object.entries(fastAddComponent?.packageJson?.dependencies || {}).map(([key, value]: [string, string]): string => {
                return `${key}@${value}`;
            }),
            Object.entries(fastAddComponent?.packageJson?.devDependencies || {}).map(([key, value]: [string, string]): string => {
                return `${key}@${value}`;
            }),
        );
    }
}

/**
 * Configure a FAST project
 */
async function config(options: ConfigOptions, messages: FastConfigOptionMessages, defaults: Partial<ConfigOptions>): Promise<void> {
    let config: ConfigOptions = options;

    if (config.useDefaults) {
        config = { ...defaults, ...options };
    }

    if (!config.componentPath) {
        /**
         * Collect information for the fast.config.json file
         */
        config.componentPath = await prompts([
            {
                type: "text",
                name: "componentPath",
                message: messages.componentPath

            }
        ]).componentPath;
    }

    if (!config.rootDir) {
        config.rootDir = await prompts([
            {
                type: "text",
                name: "rootDir",
                message: messages.rootDir
            }
        ]).rootDir;
    }

    if (!config.componentPrefix) {
        config.componentPrefix = await prompts([
            {
                type: "text",
                name: "componentPrefix",
                message: messages.componentPrefix,
                validate: (input): boolean => {
                    return input !== "";
                }
            }
        ]).componentPrefix;
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
async function init(options: InitOptions, messages: FastInitOptionMessages, defaults: Partial<InitOptions>): Promise<void> {
    let config = options;

    if (options.useDefaults) {
        config = { ...defaults, ...options };
    }

    if (!config.template) {
        /**
         * Collect information for the package.json file
         */
         config.template = await prompts([
            {
                type: "text",
                name: "template",
                initial: defaultTemplatePath,
                message: messages.template,
            }
        ]).template;
    }

    if (!await isTemplateRemotePackage(config.template)) {
        config.template = path.resolve(__dirname, options.template);
    }

    const initFile: FastInit = getFastInit(config.template);
    await installTemplate(config.template);
    createConfigFile(initFile.fastConfig);
    const packageName: string = copyTemplateToProject(config.template, initFile.packageJson, path.resolve(__dirname));
    await installDependencies();
    await installPlaywrightBrowsers();
    await uninstallTemplate(packageName);
}

const yesToAllDefaultsMessage: string = "Use all defaults";

const initTemplateMessage: string = "Project template";
const initDefaults: Partial<InitOptions> = {
    template: defaultTemplatePath
}

program
    .command("init")
    .description("Initialize a new project")
    .option("-t, --template <template>", initTemplateMessage, initDefaults.template)
    .option("-y, --yes-all", yesToAllDefaultsMessage)
    .action(async (options): Promise<void> => {
        await init(
            options,
            {
                template: initTemplateMessage
            },
            initDefaults
        ).catch((reason) => {
            throw reason;
        });
    });

const configComponentPathMessage: string = "Path to component folder";
const configRootDirMessage: string = "Root directory";
const configPrefixMessage: string = "The web component prefix";
const configDefaults: Partial<ConfigOptions> = {
    componentPrefix: "fast",
    componentPath: "./components",
    rootDir: "./src",
}

program.command("config")
    .description("Configure a project")
    .option("-n, --component-prefix <component-prefix>", configPrefixMessage, configDefaults.componentPrefix)
    .option("-p, --component-path <path/to/components>", configComponentPathMessage, configDefaults.componentPath)
    .option("-r, --root-dir <path/to/root>", configRootDirMessage, configDefaults.rootDir)
    .option("-y, --yes-all", yesToAllDefaultsMessage)
    .action(async (options): Promise<void> => {
        await config(
            options,
            {
                componentPrefix: configPrefixMessage,
                componentPath: configComponentPathMessage,
                rootDir: configRootDirMessage
            },
            configDefaults
        ).catch((reason) => {
            throw reason;
        });
    });

const addDesignSystemShadowRootModeMessage: string = "The shadowroot mode";
const addDesignSystemDefaults: Partial<AddDesignSystemOptions> = {
    shadowRootMode: "open"
}

program.command("add-design-system")
    .description("Add a design system")
    .option("-s, --shadow-root-mode <mode>", addDesignSystemShadowRootModeMessage, addDesignSystemDefaults.shadowRootMode)
    .option("-y, --yes-all", yesToAllDefaultsMessage)
    .action(async (options): Promise<void> => {
        await addDesignSystem(
            options,
            {
                shadowRootMode: addDesignSystemShadowRootModeMessage
            },
            addDesignSystemDefaults
        ).catch((reason) => {
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
const addFoundationComponentAllMessage = "Add all available foundation components"

program.command("add-foundation-component")
    .description("Add a foundation component")
    .option("-t, --template <template>", addFoundationComponentTemplateMessage)
    .option("-n, --name <name>", addFoundationComponentNameMessage)
    .option("-a, --all", addFoundationComponentAllMessage)
    .option("-y, --yes-all", yesToAllDefaultsMessage)
    .action(async (options): Promise<void> => {
        await addFoundationComponent(options, {
            template: addFoundationComponentTemplateMessage,
            name: addFoundationComponentNameMessage
        }).catch((reason) => {
            throw reason;
        })
    });

program.parse(process.argv);

export { ComponentTemplateConfig };
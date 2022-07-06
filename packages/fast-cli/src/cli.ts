#!/usr/bin/env node

import path from "path";
import * as commander from "commander";
import spawn from "cross-spawn";
import type { AddComponentOptionMessages, AddComponentOptions, AddDesignSystemOptionMessages, AddDesignSystemOptions, AddFoundationComponentOptionMessages, AddFoundationComponentOptions, ConfigOptions, FastAddComponent, FastConfig, FastConfigOptionMessages, FastInit, FastInitOptionMessages, InitOptions, PackageJsonAddComponent, PackageJsonInit, RequiredComponents } from "./cli.options.js";
import { requiredComponentTemplateFiles } from "./components/files.js";
import { componentExportFileNotFound, componentTemplateFileNotFoundMessage, componentTemplateFilesNotFoundMessage, fastConfigDoesNotContainComponentPathMessage, fastConfigDoesNotExistErrorMessage } from "./cli.errors.js";
import type { WriteFileConfig, XOR } from "./cli.types.js";
import type { ComponentTemplateConfig } from "./utilities/template.js";
import { disallowedTemplateNames, suggestedTemplates } from "./components/options.js";
import { copyFiles, createEmptyDir, localPathExists, readDir, readFile, writeFiles } from "./cli.fs.js";
import { addComponentPrompts, addDesignSystemPrompts, addFoundationComponentPrompts, allowedFoundationComponentNamePrompt, configPrompts, initPrompts } from "./cli.prompt.js";
import { __dirname, ascii, cliPath, defaultTemplatePath, folderMatches, templateFolderName } from "./cli.globals.js";
import { stringModifier, toCamelCase, toPascalCase } from "./cli.utilities.js";
import designSystemTemplate from "./templates/design-system.js";
import type { RenderableTemplate } from "./cli.template.js";

const program = new commander.Command();

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

    return readFile(path.resolve(templateDir, "fast.init.json"), true);
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
    copyFiles(templateDir, destDir);

    // Update the package.json file
    const packageName = getPackageName(packageJson);
    writeFiles([{
        name: "package.json",
        directory: destDir,
        contents: JSON.stringify(
            {
                ...packageJson,
                name: packageName
            },
            null,
            2
        )
    }])

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
    writeFiles([
        {
            name: "fast.config.json",
            directory: __dirname,
            contents: JSON.stringify(fastConfig, null, 2)
        }
    ]);
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

    if (!await localPathExists(fastConfigPath)) {
        throw new Error(fastConfigDoesNotExistErrorMessage());
    }

    const fastConfig = readFile<FastConfig>(fastConfigPath, true);

    if (typeof fastConfig.componentPath !== "string") {
        throw new Error(fastConfigDoesNotContainComponentPathMessage());
    }

    return fastConfig;
}

function getFastAddComponent(pathToTemplatePackage: string): FastAddComponent {
    const templateDir = path.resolve(
        __dirname,
        "node_modules",
        pathToTemplatePackage,
        templateFolderName
    );

    return readFile<FastAddComponent>(path.resolve(templateDir, "fast.add-component.json"), true);
}

async function createDesignSystemFile(
    designSystemOptions: AddDesignSystemOptions,
): Promise<Array<WriteFileConfig>> {
    const fastConfig = await getFastConfig();
    const rootDir = fastConfig.rootDir ? fastConfig.rootDir : "";
    const files: Array<WriteFileConfig> = [
        {
            name: "design-system.ts",
            directory: path.resolve(rootDir),
            contents: designSystemTemplate(fastConfig, designSystemOptions),
        }
    ]

    writeFiles(files);
    ensureComponentExportFile(fastConfig, rootDir);
    return files;
}

function ensureComponentExportFile(fastConfig: FastConfig, rootDir: string): void {
    const fileDirectory: string = path.resolve(rootDir, fastConfig.componentPath);
    const fileName: string = "index.ts";

    try {
        const fileContents = readFile(path.resolve(fileDirectory, fileName), false);

        if (!fileContents) {
            throw new Error(componentExportFileNotFound());
        }
    } catch (e) {
        console.warn(e);

        writeFiles([
            {
                name: fileName,
                directory: fileDirectory,
                contents: `export default [];`
            }
        ]);
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
    const config: AddDesignSystemOptions = await addDesignSystemPrompts(options, messages, defaults);

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
    const directoryContents = readDir(templateDir);

    if (!Array.isArray(directoryContents)) {
        throw new Error(componentTemplateFilesNotFoundMessage());
    }

    // Run through available template files and make sure all required files are accounted for
    for (const [templateFile,] of Object.entries(requiredComponentTemplateFiles)) {
        if (!directoryContents.includes(templateFile)) {
            throw new Error(`${componentTemplateFileNotFoundMessage}: ${templateFile}`);
        }
    }
}

export async function getTemplateFiles(fastConfig: FastConfig, pathToTemplatePackage: string, cliTemplate: boolean, name: string): Promise<Array<WriteFileConfig>> {
    const rootDir = fastConfig.rootDir ? fastConfig.rootDir : "";
    const normalizedPathToTemplatePackage: string = cliTemplate
        ? `./components/${
            pathToTemplatePackage
        }`
        : path.relative(cliPath, pathToTemplatePackage);
    const files: Array<WriteFileConfig> = [];

    // Ensure there is an empty directory with the provided name
    createEmptyDir(path.resolve(rootDir, fastConfig.componentPath, name));

    // Create an array of template items based on the files.ts
    for (const [templateName, fileName] of Object.entries(requiredComponentTemplateFiles)) {
        const { default: template } = await import(`${normalizedPathToTemplatePackage}/template/${templateName}`);
        const basename = path.basename(fileName(name));
        const fileDir = fileName(name).replace(basename, "");

        files.push({
            name: basename,
            directory: path.resolve(rootDir, fastConfig.componentPath, name, fileDir),
            contents: (template as RenderableTemplate).render({
                tagName: name,
                className: toPascalCase(name),
                definitionName: `${toCamelCase(name)}Definition`,
                componentPrefix: fastConfig.componentPrefix,
            })
        });
    }

    return files;
}

/**
 * Add a component from a npm package or local template
 */
async function addComponent(
    options: AddComponentOptions,
    messages: AddComponentOptionMessages,
): Promise<void> {
    const config: AddComponentOptions = await addComponentPrompts(options, messages);
    const fastConfig: FastConfig = await getFastConfig();

    await installTemplate(config.template as string);
    await checkTemplateForFiles(config.template as string);
    const files = await getTemplateFiles(fastConfig, config.template as string, false, config.name as string);
    writeFiles(files);
    const fastAddComponent: FastAddComponent = getFastAddComponent(
        config.template as string
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

/**
 * Gets a foundation component name that will not cause naming conflicts
 */
async function getAllowedFoundationComponentName(name: string, template: string): Promise<string> {
    const updatedName: string = await allowedFoundationComponentNamePrompt(name, template);

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
    if (options.all) {
        suggestedTemplates.forEach(async (template: string) => {
            await addFoundationComponent({
                template,
                name: template,
            },
                messages)
        });
    } else {
        const config = await addFoundationComponentPrompts(options, messages);

        if (disallowedTemplateNames.includes(config.name as string)) {
            config.name = await getAllowedFoundationComponentName(
                config.name as string,
                config.template as string
            );
        }

        const fastConfig: FastConfig = await getFastConfig();
        const files = await getTemplateFiles(fastConfig, config.template as string, true, config.name as string);

        await writeFiles(files);
        const fastAddComponent: FastAddComponent = getFastAddComponent(
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
                    name: stringModifier(config.name as string, requiredComponent.nameModifier),
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
    const config = await configPrompts(options, messages, defaults);

    createConfigFile(config);
}

/**
 * Initialize a FAST project
 */
async function init(
    options: InitOptions,
    messages: FastInitOptionMessages,
    defaults: Partial<InitOptions>
): Promise<void> {
    const config = await initPrompts(options, messages, defaults);

    if (!await localPathExists(path.resolve(__dirname, config.template))) {
        config.template = path.resolve(__dirname, config.template);
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
export { htmlTemplate, mdTemplate, tsTemplate } from "./cli.template.js";
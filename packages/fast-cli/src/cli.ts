#!/usr/bin/env node

import path from "path";
import * as commander from "commander";
import spawn from "cross-spawn";
import type { AddComponentOptionMessages, AddComponentOptions, AddDesignSystemOptionMessages, AddDesignSystemOptions, AddFoundationComponentOptionMessages, AddFoundationComponentOptions, ConfigOptions, CopyTemplateConfig, FastAddComponent, FastConfig, FastConfigOptionMessages, FastInit, FastInitOptionMessages, InitOptions, TemplateFileConfig } from "./cli.options.js";
import { requiredComponentTemplateFiles } from "./components/files.js";
import { componentExportFileNotFound, componentTemplateFileNotFoundMessage, componentTemplateFilesNotFoundMessage, fastConfigDoesNotContainComponentPathMessage, fastConfigDoesNotExistErrorMessage } from "./cli.errors.js";
import type { WriteFileConfig } from "./cli.types.js";
import type { ComponentTemplateConfig } from "./utilities/template.js";
import { disallowedTemplateNames, suggestedTemplates } from "./components/options.js";
import { copyFiles, createEmptyDir, localPathExists, readDir, readFile, writeFiles } from "./cli.fs.js";
import { addComponentPrompts, addDesignSystemPrompts, addFoundationComponentPrompts, allowedFoundationComponentNamePrompt, configPrompts, initPrompts } from "./cli.prompt.js";
import { __dirname, ascii, cliPath, defaultTemplatePath, folderMatches, templateFolderName } from "./cli.globals.js";
import { getPackageName, stringModifier, toCamelCase, toPascalCase } from "./cli.utilities.js";
import designSystemTemplate from "./templates/design-system.js";

const program = new commander.Command();

/**
 * Setup the CLI
 */
program.name("fast").description(ascii);

/**
 * Get the fast.init.json file
 */
async function getFastInit(
    pathToTemplatePackage: string,
    isLocalFile: boolean,
): Promise<FastInit> {
    if (!isLocalFile) {
        await installDependencies([pathToTemplatePackage]);
    }

    const templateDir = path.resolve(
        ...(
            !isLocalFile
                ? [__dirname, "node_modules"]
                : []
        ),
        pathToTemplatePackage,
        templateFolderName
    );

    return readFile(path.resolve(templateDir, "fast.init.json"), true);
}

/**
 * Copy the template to the project
 */
function copyTemplateToProject(
    config: CopyTemplateConfig
): string {
    const templateDir = path.resolve(
        __dirname,
        "node_modules",
        config.pathToTemplatePackage,
        templateFolderName
    );

    // Copy all files in the template folder
    copyFiles(templateDir, config.destDir);

    // Update the package.json file
    const packageName = getPackageName(config.packageJson, folderMatches);

    writeFiles([{
        name: "package.json",
        directory: config.destDir,
        contents: JSON.stringify(
            {
                ...config.packageJson,
                name: packageName
            },
            null,
            2
        )
    }]);

    return packageName;
}

/**
 * Install dependencies
 */
export const installDependencies = (
    listOfDependencies: Array<string>,
    modifier?: string
): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        if (listOfDependencies.length === 0) {
            resolve(void 0);
        }

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

/**
 * Install an npm dependency
 */
async function installEnumeratedDependencies(
    dependencies?: Array<string>,
    devDependencies?: Array<string>
): Promise<void> {
    await installDependencies(dependencies || []);
    await installDependencies(devDependencies || [], "--save-dev");
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

/**
 * Create the fast.config.json file
 */
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

/**
 * Get the fast.config.json file
 */
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

/**
 * Get the fast.add-component.json file
 */
async function getFastAddComponent(
    pathToTemplatePackage: string,
    isLocalFile: boolean,
): Promise<FastAddComponent> {
    if (!isLocalFile) {
        await installDependencies([pathToTemplatePackage]);
    }

    const templateDir = path.resolve(
        ...(
            !isLocalFile
                ? [__dirname, "node_modules"]
                : []
        ),
        pathToTemplatePackage,
        templateFolderName
    );

    return readFile<FastAddComponent>(path.resolve(templateDir, "fast.add-component.json"), true);
}

/**
 * Create the design-system.ts file
 */
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

/**
 * Ensure the file exporting the components exists
 */
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
 * Add a design-system.ts file
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

/**
 * Check the template for files that should exist
 */
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

/**
 * Get the template files to be written
 */
async function getTemplateFiles(
    config: TemplateFileConfig
    ): Promise<Array<WriteFileConfig>> {
    const normalizedPathToTemplatePackage: string = config.cliTemplate
        ? `./components/${config.pathToTemplatePackage}`
        : path.relative(cliPath, config.pathToTemplatePackage);
    const files: Array<WriteFileConfig> = [];

    // Create an array of template items based on the files.ts
    for (const [templateName, fileName] of Object.entries(requiredComponentTemplateFiles)) {
        const { default: template } = await import(`${normalizedPathToTemplatePackage}/template/${templateName}`);
        const basename = path.basename(fileName(config.name));
        const fileDir = fileName(config.name).replace(basename, "");

        files.push({
            name: basename,
            directory: path.resolve(config.rootDir, config.fastConfig.componentPath, config.name, fileDir),
            contents: template.render({
                tagName: config.name,
                className: toPascalCase(config.name),
                definitionName: `${toCamelCase(config.name)}Definition`,
                componentPrefix: config.fastConfig.componentPrefix,
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

    const rootDir = fastConfig.rootDir ? fastConfig.rootDir : "";
    const files = await getTemplateFiles({
        rootDir,
        fastConfig,
        pathToTemplatePackage: config.template as string,
        cliTemplate: false,
        name: config.name as string
    });
    // Ensure there is an empty directory with the provided name
    createEmptyDir(path.resolve(rootDir, fastConfig.componentPath, config.name as string));
    writeFiles(files);
    const isLocalTemplate = await localPathExists(path.resolve(__dirname, config.template as string));


    if (isLocalTemplate) {
        config.template = path.resolve(__dirname, config.template as string);
    }

    const fastAddComponent: FastAddComponent = await getFastAddComponent(
        config.template as string,
        isLocalTemplate
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
        for (const template of suggestedTemplates) {
            await addFoundationComponent(
                {
                    template,
                    name: template,
                },
                messages
            )
        }
    } else {
        const config = await addFoundationComponentPrompts(options, messages);

        if (disallowedTemplateNames.includes(config.name as string)) {
            config.name = await getAllowedFoundationComponentName(
                config.name as string,
                config.template as string
            );
        }

        const fastConfig: FastConfig = await getFastConfig();
        const rootDir = fastConfig.rootDir ? fastConfig.rootDir : "";
        const files = await getTemplateFiles({
            rootDir,
            fastConfig,
            pathToTemplatePackage: config.template as string,
            cliTemplate: true,
            name: config.name as string
        });

        // Ensure there is an empty directory with the provided name
        createEmptyDir(path.resolve(rootDir, fastConfig.componentPath, config.name as string));
        await writeFiles(files);
        const fastAddComponent: FastAddComponent = await getFastAddComponent(
            path.resolve(
                cliPath,
                "dist",
                "esm",
                "components",
                config.template as string
            ),
            true
        );

        await installEnumeratedDependencies(
            Object.entries(fastAddComponent?.packageJson?.dependencies || {}).map(([key, value]: [string, string]): string => {
                return `${key}@${value}`;
            }),
            Object.entries(fastAddComponent?.packageJson?.devDependencies || {}).map(([key, value]: [string, string]): string => {
                return `${key}@${value}`;
            }),
        );

        for (const requiredComponent of (fastAddComponent?.requiredComponents || [])) {
            await addFoundationComponent({
                ...options,
                name: stringModifier(config.name as string, requiredComponent.nameModifier),
                template: requiredComponent.template,
            }, messages);
        }
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
    const isLocalTemplate = await localPathExists(path.resolve(__dirname, config.template));

    if (isLocalTemplate) {
        config.template = path.resolve(__dirname, config.template);
    }

    const initFile: FastInit = await getFastInit(config.template, isLocalTemplate);

    await installTemplate(config.template);
    createConfigFile(initFile.fastConfig);
    const packageName: string = copyTemplateToProject({
        pathToTemplatePackage: config.template,
        packageJson: initFile.packageJson,
        destDir: path.resolve(__dirname)
    });
    await installDependencies([]);
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
#!/usr/bin/env node

import path from "path";
import * as commander from "commander";
import spawn from "cross-spawn";
import { ESLint } from "eslint";
import eslintPlugin from "@microsoft/eslint-plugin-fast-cli-migrate";
import type { AddComponentOptionMessages, AddComponentOptions, AddDesignSystemOptionMessages, AddDesignSystemOptions, AddFoundationComponentOptionMessages, AddFoundationComponentOptions, ConfigOptions, FastAddComponent, FastConfig, FastConfigOptionMessages, FastInitOptionMessages, InitOptions, TemplateFileConfig } from "./cli.options.js";
import { requiredComponentTemplateFiles } from "./components/files.js";
import { componentExportFileNotFound, fastConfigDoesNotContainComponentPathMessage, fastConfigDoesNotExistErrorMessage } from "./cli.errors.js";
import type { WriteFileConfig } from "./cli.types.js";
import { availableTemplates, disallowedTemplateNames, suggestedTemplates } from "./components/options.js";
import { createEmptyDir, localPathExists, readFile, writeFiles } from "./cli.fs.js";
import { addComponentPrompts, addDesignSystemPrompts, addFoundationComponentPrompts, allowedFoundationComponentNamePrompt, configPrompts, initPrompts } from "./cli.prompt.js";
import { __dirname, ascii, initDefaultExportName, initDefaultFilePath, initDefaultTemplate, templateFolderName } from "./cli.globals.js";
import { stringModifier, toCamelCase, toPascalCase } from "./cli.utilities.js";
import designSystemTemplate from "./templates/design-system.js";
import { configVersionDictionary, currentConfigVersion, isLatestConfigVersion } from "./cli.migrate.js";

const program = new commander.Command();

/**
 * Setup the CLI
 */
program.name("fast").description(ascii);


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
            contents: JSON.stringify({
                ...fastConfig,
            } as FastConfig, null, 2)
        }
    ]);
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

    const templateDir = `${pathToTemplatePackage}/${templateFolderName}/fast.add-component.json`;

    const {
        default: config
    } = await import(templateDir, { assert: {type: 'json'} })

    return config;
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
 * Get the template files to be written
 */
async function getTemplateFiles(
    config: TemplateFileConfig
    ): Promise<Array<WriteFileConfig>> {
    const normalizedPathToTemplatePackage: string = config.cliTemplate
        ? `./components/${config.pathToTemplatePackage}`
        : config.pathToTemplatePackage;
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
    if (options.list) {
        availableTemplates.forEach((item) => console.log(item));
    } else if (options.all) {
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
           `./components/${config.template as string}`,
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

    createConfigFile({
        version: currentConfigVersion,
        rootDir: config.rootDir,
        componentPath: config.componentPath,
        componentPrefix: config.componentPrefix
    });
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

    await installTemplate(config.template);
    
    const exports = await import(path.join(config.template, config.filePath));
    writeFiles(exports[config.exportName]);
    await installDependencies([]);

    const templatePackageJson: any = readFile(path.resolve(".", "package.json"), true);
    if (typeof templatePackageJson?.afterInstallMessage === "string") {
        console.log(templatePackageJson.afterInstallMessage);
    }
}

async function getVersion(): Promise<void> {
    console.log(`CLI local version:`);
    const localArgs = [
        "ls",
        "--depth=0",
        "@microsoft/fast-cli"
    ]
    spawn("npm", localArgs, { stdio: "inherit" });
    console.log(`CLI global version:`);
    const globalArgs = [
        "ls",
        "-g",
        "--depth=0",
        "@microsoft/fast-cli"
    ]
    spawn("npm", globalArgs, { stdio: "inherit" });
}

async function migrate(): Promise<void> {
    const config = await getFastConfig();
    const currentVersion: string = config.version || "1.0.0-alpha.1";

    if (isLatestConfigVersion(currentVersion)) {
        console.log("You are on the latest version");
        return;
    }

    const nextVersion: string = configVersionDictionary[currentVersion].next as string;
    const eslint = new ESLint({
        fix: true,
        useEslintrc: false,
        // rulePaths: ["../node_modules/@microsoft/eslint-plugin-fast-cli-migrate/dist/rules"],
        baseConfig: {
            plugins: [
                "@microsoft/eslint-plugin-fast-cli-migrate"
            ],
            extends: [
                `plugin:@microsoft/eslint-plugin-fast-cli-migrate/${currentVersion}`
            ],
            parserOptions: {
                fastConfig: config,
                ecmaVersion: 2017
            },
            parser: "@typescript-eslint/parser",
            env: {
                es6: true
            },
        },
        plugins: { "@microsoft/eslint-plugin-fast-cli-migrate": eslintPlugin },
    });
    const results = await eslint.lintFiles(["./**/*.ts"]);

    // Update files
    await ESLint.outputFixes(results);

    // Update dependencies
    await installDependencies(
        configVersionDictionary[nextVersion].dependencies.map((dependency) => {
            return `${dependency.package}@${dependency.version}`;
        })
    );

    // Update the config
    config.version = nextVersion;
    createConfigFile(config);
    
    console.log(`Migration to ${nextVersion} is complete.`)
}

const yesToAllDefaultsMessage: string = "Use all defaults";

const initTemplateMessage: string = "Project template";
const initFilePathMessage: string = "Export file path";
const initExportNameMessage: string = "Export name";
const initDefaults: Partial<InitOptions> = {
    template: initDefaultTemplate,
    filePath: initDefaultFilePath,
    exportName: initDefaultExportName
}

program
    .command("init")
    .description("Initialize a new project")
    .option("-t, --template <template>", initTemplateMessage, initDefaults.template)
    .option("-f, --file-path <file-path>", initFilePathMessage, initDefaults.filePath)
    .option("-n, --export-name <export-name>", initExportNameMessage, initDefaults.exportName)
    .option("-y, --yes-all", yesToAllDefaultsMessage)
    .action(async (options): Promise<void> => {
        await init(
            options,
            {
                template: initTemplateMessage,
                filePath: initFilePathMessage,
                exportName: initExportNameMessage,
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
const addFoundationComponentAllMessage = "Add all available foundation components";
const addFoundationComponentListMessage = "List available foundation components";

program.command("add-foundation-component")
    .description("Add a foundation component")
    .option("-t, --template <template>", addFoundationComponentTemplateMessage)
    .option("-n, --name <name>", addFoundationComponentNameMessage)
    .option("-a, --all", addFoundationComponentAllMessage)
    .option("-y, --yes-all", yesToAllDefaultsMessage)
    .option("-l, --list", addFoundationComponentListMessage)
    .action(async (options: AddFoundationComponentOptions): Promise<void> => {
        await addFoundationComponent(options, {
            template: addFoundationComponentTemplateMessage,
            name: addFoundationComponentNameMessage
        }).catch((reason) => {
            throw reason;
        })
    });

program.command("version")
    .description("Current version")
    .action(async (): Promise<void> => {
        await getVersion().catch((reason) => {
            throw reason;
        })
    });

program.command("migrate")
    .description("Migrate to the next config version")
    .action(async (): Promise<void> => {
        await migrate().catch((reason) => {
            throw reason;
        })
    })

program.parse(process.argv);
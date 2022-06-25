import prompts from "prompts";
import { defaultTemplatePath } from "./cli.globals.js";
import type {
    AddComponentOptionMessages,
    AddComponentOptions,
    AddDesignSystemOptionMessages,
    AddDesignSystemOptions,
    AddFoundationComponentOptionMessages,
    AddFoundationComponentOptions,
    ConfigOptions,
    FastConfigOptionMessages,
    FastInitOptionMessages,
    InitOptions
} from "./cli.options.js";
import { suggestedTemplates } from "./components/options.js";

/**
 * This file includes utilities for any arguments or user prompts
 */

export async function addComponentPrompts(
    options: AddComponentOptions,
    messages: AddComponentOptionMessages
): Promise<AddComponentOptions> {
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

    return config;
}

export async function addDesignSystemPrompts(
    options: AddDesignSystemOptions,
    messages: AddDesignSystemOptionMessages,
    defaults: Partial<AddDesignSystemOptions>
): Promise<AddDesignSystemOptions> {
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

    return config;
}

export async function addFoundationComponentPrompts(
    options: AddFoundationComponentOptions,
    messages: AddFoundationComponentOptionMessages,
): Promise<AddFoundationComponentOptions> {
    const config: AddFoundationComponentOptions = options;

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

    return config;
}

export async function configPrompts(
    options: ConfigOptions,
    messages: FastConfigOptionMessages,
    defaults: Partial<ConfigOptions>
): Promise<ConfigOptions> {
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

    return config;
}

export async function allowedFoundationComponentNamePrompt(name: string, template: string): Promise<string> {
    return prompts([
        {
            type: "text",
            name: "name",
            message: `The name "${name}" is not allowed, choose a different name`,
            initial: template
        }
    ]).name;
}

export async function initPrompts(
    options: InitOptions,
    messages: FastInitOptionMessages,
    defaults: Partial<InitOptions>
): Promise<InitOptions> {
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

    return config;
}
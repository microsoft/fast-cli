import type { StringModifierConfig } from "./cli.types";
import { fastAddComponentRequiredComponentMissingNameModificatierMessage } from "./cli.errors.js";

export function toPascalCase(kabobCase: string): string {
    return `${kabobCase}`
        .replace(new RegExp(/[-]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
            new RegExp(/\s+(.)(\w*)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
        )
        .replace(new RegExp(/\w/), s => s.toUpperCase());
}

export function toCamelCase(kabobCase: string): string {
    const pascalCase: string = toPascalCase(kabobCase);
    return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
}

export function stringModifier(
    text: string,
    modifierConfig: StringModifierConfig
): string {
    let updatedText = text;

    if (modifierConfig.append) {
        updatedText = updatedText + modifierConfig.append;
    }

    if (modifierConfig.prepend) {
        updatedText = modifierConfig.prepend + updatedText;
    }

    if (text === updatedText) {
        throw new Error(fastAddComponentRequiredComponentMissingNameModificatierMessage(text));
    }

    return updatedText;
}
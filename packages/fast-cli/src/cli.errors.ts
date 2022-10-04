export function fastConfigDoesNotExistErrorMessage(): string {
    return "fast.config.json file does not exist, run the config command to generate this file.";
}
export function fastConfigDoesNotContainComponentPathMessage(): string {
    return "fast.config.json file does not contain a component path, add a component path to generate a design system file.";
}
export function fastAddComponentRequiredComponentMissingNameModificatierMessage(name: string): string {
    return `The ${name} has a required component that does not supply a prepend or append modification`
}
export function componentExportFileNotFound(): string {
    return "Component export file not found.";
}
export function fastConfigDoesNotExistErrorMessage(): string {
    return "fastconfig.json file does not exist, run the config command to generate this file.";
}
export function fastConfigDoesNotContainComponentPathMessage(): string {
    return "fastconfig.json file does not contain a component path, add a component path to generate a design system file.";
}
export function componentTemplateFilesNotFoundMessage(): string {
    return "The component template provided does not appear to contain any files or could not be read.";
}
export function componentTemplateFileNotFoundMessage(): string {
    return "The component template provided is missing the following required template file";
}
export function fastAddComponentRequiredComponentMissingNameModificatierMessage(name: string): string {
    return `The ${name} has a required component that does not supply a prepend or append modification`
}
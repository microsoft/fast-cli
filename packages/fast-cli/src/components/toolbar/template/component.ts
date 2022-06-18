import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { composedParent, Toolbar as FoundationToolbar } from "@microsoft/fast-foundation";

/**
 * A class derived from the Toolbar foundation component
 */
export class ${config.className} extends FoundationToolbar {};`
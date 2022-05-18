import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Search } from "@microsoft/fast-foundation";

/**
 * A class derived from the Search foundation component
 */
export class ${config.className} extends Search {};`
import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { TextArea } from "@microsoft/fast-foundation";

/**
 * A class derived from the TextArea foundation component
 */
export class ${config.className} extends TextArea {};`
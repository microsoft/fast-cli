import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { TextField } from "@microsoft/fast-foundation";

/**
 * A class derived from the TextField foundation component
 */
export class ${config.className} extends TextField {};`
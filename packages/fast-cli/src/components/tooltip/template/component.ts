import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Tooltip } from "@microsoft/fast-foundation";

/**
 * A class derived from the Tooltip foundation component
 */
export class ${config.className} extends Tooltip {};`
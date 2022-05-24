import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Toolbar } from "@microsoft/fast-foundation";

/**
 * A class derived from the Toolbar foundation component
 */
export class ${config.className} extends Toolbar {};`
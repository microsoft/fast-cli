import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Divider } from "@microsoft/fast-foundation";

/**
 * A class derived from the Divider foundation component
 */
export class ${config.className} extends Divider {};`
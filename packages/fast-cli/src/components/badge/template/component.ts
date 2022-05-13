import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Badge } from "@microsoft/fast-foundation";

/**
 * A class derived from the Badge foundation component
 */
export default class ${config.className} extends Badge {};`
import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Badge as FoundationBadge } from "@microsoft/fast-foundation";

/**
 * A class derived from the Badge foundation component
 */
export class ${config.className} extends FoundationBadge {};`
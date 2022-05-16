import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Card } from "@microsoft/fast-foundation";
/**
 * A class derived from the Card foundation component
 */
export default class ${config.className} extends Card {};` 
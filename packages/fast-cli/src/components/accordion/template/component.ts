import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { attr } from "@microsoft/fast-element";
import { Accordion } from "@microsoft/fast-foundation";

/**
 * A class derived from the Accordion foundation component
 */
export class ${config.className} extends Accordion {};`
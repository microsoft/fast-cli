import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { attr } from "@microsoft/fast-element";
import { AccordionItem } from "@microsoft/fast-foundation";

/**
 * A class derived from the AccordionItem foundation component
 */
export class ${config.className} extends AccordionItem {};`
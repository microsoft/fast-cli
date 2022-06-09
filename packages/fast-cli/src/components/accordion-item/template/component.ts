import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { attr } from "@microsoft/fast-element";
import { AccordionItem as FoundationAccordionItem } from "@microsoft/fast-foundation";

/**
 * A class derived from the FoundationAccordionItem foundation component
 */
export class ${config.className} extends FoundationAccordionItem {};`
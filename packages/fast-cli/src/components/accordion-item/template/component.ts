import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { AccordionItem as FoundationAccordionItem } from "@microsoft/fast-foundation";

/**
 * A class derived from the FoundationAccordionItem foundation component
 */
export class ${c => c.className} extends FoundationAccordionItem {};`
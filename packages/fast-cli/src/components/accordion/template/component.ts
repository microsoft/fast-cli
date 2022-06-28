import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { attr } from "@microsoft/fast-element";
import { Accordion as FoundationAccordion } from "@microsoft/fast-foundation";

/**
 * A class derived from the Accordion foundation component
 */
export class ${c => c.className} extends FoundationAccordion {};`
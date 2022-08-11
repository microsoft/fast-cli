import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { Checkbox as FoundationCheckbox, checkboxTemplate, FoundationElementTemplate } from "@microsoft/fast-foundation";
import type { ViewTemplate } from "@microsoft/fast-element";
/**
 * The template for ${c => c.className} component.
 * @public
 */
export const template: FoundationElementTemplate<ViewTemplate<FoundationCheckbox>> = checkboxTemplate;
`; 
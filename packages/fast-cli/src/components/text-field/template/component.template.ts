import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { TextField as FoundationTextField, textFieldTemplate, FoundationElementTemplate } from "@microsoft/fast-foundation";
import type { ViewTemplate } from "@microsoft/fast-element";

/**
 * The template for ${c => c.className} component.
 * @public
 */
export const template: FoundationElementTemplate<ViewTemplate<FoundationTextField>> = textFieldTemplate;
`;
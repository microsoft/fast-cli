import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
import { Checkbox as FoundationCheckbox, checkboxTemplate, FoundationElementTemplate } from "@microsoft/fast-foundation";
import type { ViewTemplate } from "@microsoft/fast-element";
/**
 * The template for ${config.className} component.
 * @public
 */
export const template: FoundationElementTemplate<ViewTemplate<FoundationCheckbox>> = checkboxTemplate;
`; 
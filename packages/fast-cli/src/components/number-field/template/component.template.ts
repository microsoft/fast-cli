import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
import { NumberField as FoundationNumberField, numberFieldTemplate, FoundationElementTemplate } from "@microsoft/fast-foundation";
import type { ViewTemplate } from "@microsoft/fast-element";

/**
 * The template for ${config.className} component.
 * @public
 */
export const template: FoundationElementTemplate<ViewTemplate<FoundationNumberField>> = numberFieldTemplate;
`; 
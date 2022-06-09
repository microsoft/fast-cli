import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
import { Toolbar as FoundationToolbar, toolbarTemplate, FoundationElementTemplate } from "@microsoft/fast-foundation";
import type { ViewTemplate } from "@microsoft/fast-element";

/**
 * The template for ${config.className} component.
 * @public
 */
export const template: FoundationElementTemplate<ViewTemplate<FoundationToolbar>> = toolbarTemplate;
`;
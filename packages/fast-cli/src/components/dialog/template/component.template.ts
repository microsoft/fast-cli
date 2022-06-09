import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
import { Dialog as FoundationDialog, dialogTemplate, FoundationElementTemplate } from "@microsoft/fast-foundation";
import type { ViewTemplate } from "@microsoft/fast-element";

/**
 * The template for ${config.className} component.
 * @public
 */
export const template: FoundationElementTemplate<ViewTemplate<FoundationDialog>> = dialogTemplate;
`;
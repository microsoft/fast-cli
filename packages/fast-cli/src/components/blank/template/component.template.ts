import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
import { html } from "@microsoft/fast-element";
import type { FoundationElementTemplate } from "@microsoft/fast-foundation";
import type { ViewTemplate } from "@microsoft/fast-element";
import type { ${config.className} } from "./${config.tagName}.js";

/**
 * The template for ${config.className} component.
 * @public
 */
export const template: FoundationElementTemplate<ViewTemplate<${config.className}>> = (
    context,
    definition
) => html\`
    <template>
        <slot></slot>
    </template>
\`;
`;
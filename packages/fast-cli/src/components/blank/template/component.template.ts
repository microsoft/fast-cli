import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
import { html } from "@microsoft/fast-element";
import type { ViewTemplate } from "@microsoft/fast-element";
import type { ${config.className} } from "./${config.tagName}.js";

/**
 * The template for ${config.className} component.
 * @public
 */
export const template: ViewTemplate<${config.className}> = html\`
    <template>
        <slot></slot>
    </template>
\`;
`;
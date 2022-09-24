import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { html } from "@microsoft/fast-element";
import type { FoundationElementTemplate } from "@microsoft/fast-foundation";
import type { ViewTemplate } from "@microsoft/fast-element";
import type { ${c => c.className} } from "./${c => c.tagName}.js";

/**
 * The template for ${c => c.className} component.
 * @public
 */
export const template: FoundationElementTemplate<ViewTemplate<${c => c.className}>> = (
    context,
    definition
) => html\`
    <template>
        <slot></slot>
    </template>
\`;
`;
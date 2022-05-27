import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { css, ElementStyles } from "@microsoft/fast-element";
import type { FoundationElementTemplate } from "@microsoft/fast-foundation";

/**
 * ${config.className} styles
 * @public
 */
 export const styles: FoundationElementTemplate<ElementStyles> = (
    context,
    definition
) =>
    css\`\`;
`;

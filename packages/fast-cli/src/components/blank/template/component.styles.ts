import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { css, ElementStyles } from "@microsoft/fast-element";
import type { FoundationElementTemplate } from "@microsoft/fast-foundation";

/**
 * ${c => c.className} styles
 * @public
 */
 export const styles: FoundationElementTemplate<ElementStyles> = (
    context,
    definition
) =>
    css\`\`;
`;

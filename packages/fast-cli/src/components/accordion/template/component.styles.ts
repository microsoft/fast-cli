import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { css, ElementStyles } from "@microsoft/fast-element";
import {
    display,
    FoundationElementTemplate
} from "@microsoft/fast-foundation";
import {
    designUnit,
    neutralForegroundRest,
    typeRampBase,
} from "@microsoft/adaptive-ui";

/**
 * Styles for ${c => c.className}
 * @public
 */
export const styles: FoundationElementTemplate<ElementStyles> = (
    context,
    definition
) =>
    css\`
        \${display('flex')} :host {
            box-sizing: border-box;
            flex-direction: column;
            \${typeRampBase}
            color: \${neutralForegroundRest};
            gap: calc(\${designUnit} * 1px);
        }\``;
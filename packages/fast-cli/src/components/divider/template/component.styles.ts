import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { css, ElementStyles } from "@microsoft/fast-element";
import { display, FoundationElementTemplate } from "@microsoft/fast-foundation";
import {
    designUnit,
    neutralStrokeDividerRest,
    strokeWidth
} from "@microsoft/adaptive-ui";

/**
 * Styles for ${config.className}
 * @public
 */
export const styles: FoundationElementTemplate<ElementStyles> = (
    context,
    definition
) =>
    css\`
        \${display("block")} :host {
            box-sizing: content-box;
            height: 0;
            margin: calc(\${designUnit} * 1px) 0;
            border-top: calc(\${strokeWidth} * 1px) solid \${neutralStrokeDividerRest};
            border-left: none;
        }
        :host([orientation="vertical"]) {
            height: 100%;
            margin: 0 calc(\${designUnit} * 1px);
            border-top: none;
            border-left: calc(\${strokeWidth} * 1px) solid \${neutralStrokeDividerRest};
        }
    \`;`
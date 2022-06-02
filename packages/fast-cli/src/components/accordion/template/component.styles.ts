import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { css, ElementStyles } from "@microsoft/fast-element";
import {
    display,
    FoundationElementTemplate
} from "@microsoft/fast-foundation";
import {
    bodyFont,
    neutralForegroundRest,
    neutralStrokeDividerRest,
    strokeWidth,
    typeRampMinus1FontSize,
    typeRampMinus1LineHeight,
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
        \${display("flex")} :host {
            box-sizing: border-box;
            flex-direction: column;
            font-family: \${bodyFont};
            font-size: \${typeRampMinus1FontSize};
            line-height: \${typeRampMinus1LineHeight};
            color: \${neutralForegroundRest};
            border-top: calc(\${strokeWidth} * 1px) solid \${neutralStrokeDividerRest};
        }\``
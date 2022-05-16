import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { css, ElementStyles } from "@microsoft/fast-element";
import { display, FoundationElementTemplate } from "@microsoft/fast-foundation";
import {
    accentForegroundRest,
    bodyFont,
    controlCornerRadius,
    designUnit,
    heightNumber,
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
        \${display("inline-block")} :host {
            box-sizing: border-box;
            font-family: \${bodyFont};
            font-size: \${typeRampMinus1FontSize};
            line-height: \${typeRampMinus1LineHeight};
        }
        .control {
            border-radius: calc(\${controlCornerRadius} * 1px);
            padding: calc(((\${designUnit} * 0.5) - \${strokeWidth}) * 1px)
                calc((\${designUnit} - \${strokeWidth}) * 1px);
            color: \${accentForegroundRest};
            font-weight: 600;
            border: calc(\${strokeWidth} * 1px) solid transparent;
        }
        .control[style] {
            font-weight: 400;
        }
        :host([circular]) .control {
            border-radius: 100px;
            padding: 0 calc(\${designUnit} * 1px);
            height: calc((\${heightNumber} - (\${designUnit} * 3)) * 1px);
            min-width: calc((\${heightNumber} - (\${designUnit} * 3)) * 1px);
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
        }
    \`;`
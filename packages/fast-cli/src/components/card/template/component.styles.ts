import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { css, ElementStyles } from "@microsoft/fast-element";
import {
    display,
    forcedColorsStylesheetBehavior,
    FoundationElementTemplate,
} from "@microsoft/fast-foundation";
import { SystemColors } from "@microsoft/fast-web-utilities";
import { controlCornerRadius, elevation, fillColor } from "@microsoft/adaptive-ui";

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
            --elevation: 4;
            display: block;
            contain: content;
            height: var(--${config.tagName}-height, 100%);
            width: var(--${config.tagName}-width, 100%);
            box-sizing: border-box;
            background: \${fillColor};
            border-radius: calc(\${controlCornerRadius} * 1px);
            \${elevation}
        }
    \`.withBehaviors(
        forcedColorsStylesheetBehavior(
            css\`
                :host {
                    forced-color-adjust: none;
                    background: \${SystemColors.Canvas};
                    box-shadow: 0 0 0 1px \${SystemColors.CanvasText};
                }
            \`
        )
    );`;
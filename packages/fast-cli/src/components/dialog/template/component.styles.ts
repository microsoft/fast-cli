import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { css, ElementStyles } from "@microsoft/fast-element";
import type { FoundationElementTemplate } from "@microsoft/fast-foundation";
import { controlCornerRadius, elevation, fillColor, strokeWidth } from "@microsoft/adaptive-ui";

/**
 * Styles for ${config.className}
 * @public
 */
export const styles: FoundationElementTemplate<ElementStyles> = (
    context,
    definition
) =>
    css\`
        :host([hidden]) {
            display: none;
        }
        :host {
            --elevation: 14;
            --${config.tagName}-height: 480px;
            --${config.tagName}-width: 640px;
            display: block;
        }
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            touch-action: none;
        }
        .positioning-region {
            display: flex;
            justify-content: center;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            overflow: auto;
        }
        .control {
            \${elevation}
            margin-top: auto;
            margin-bottom: auto;
            width: var(--${config.tagName}-width);
            height: var(--${config.tagName}-height);
            background-color: \${fillColor};
            z-index: 1;
            border-radius: calc(\${controlCornerRadius} * 1px);
            border: calc(\${strokeWidth} * 1px) solid transparent;
        }
    \`;`;
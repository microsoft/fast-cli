import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { css, ElementStyles } from "@microsoft/fast-element";
import {
    display,
    forcedColorsStylesheetBehavior,
    FoundationElementTemplate,
    ProgressRingOptions,
} from "@microsoft/fast-foundation";
import { SystemColors } from "@microsoft/fast-web-utilities";
import {
    accentForegroundRest,
    heightNumber,
    neutralFillRest,
    neutralForegroundHint,
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
            align-items: center;
            outline: none;
            height: calc(\${heightNumber} * 1px);
            width: calc(\${heightNumber} * 1px);
            margin: calc(\${heightNumber} * 1px) 0;
        }
        .progress {
            height: 100%;
            width: 100%;
        }
        .background {
            stroke: \${neutralFillRest};
            fill: none;
            stroke-width: 2px;
        }
        .determinate {
            stroke: \${accentForegroundRest};
            fill: none;
            stroke-width: 2px;
            stroke-linecap: round;
            transform-origin: 50% 50%;
            transform: rotate(-90deg);
            transition: all 0.2s ease-in-out;
        }
        .indeterminate-indicator-1 {
            stroke: \${accentForegroundRest};
            fill: none;
            stroke-width: 2px;
            stroke-linecap: round;
            transform-origin: 50% 50%;
            transform: rotate(-90deg);
            transition: all 0.2s ease-in-out;
            animation: spin-infinite 2s linear infinite;
        }
        :host([paused]) .indeterminate-indicator-1 {
            animation-play-state: paused;
            stroke: \${neutralFillRest};
        }
        :host([paused]) .determinate {
            stroke: \${neutralForegroundHint};
        }
        @keyframes spin-infinite {
            0% {
                stroke-dasharray: 0.01px 43.97px;
                transform: rotate(0deg);
            }
            50% {
                stroke-dasharray: 21.99px 21.99px;
                transform: rotate(450deg);
            }
            100% {
                stroke-dasharray: 0.01px 43.97px;
                transform: rotate(1080deg);
            }
        }
    \`.withBehaviors(
        forcedColorsStylesheetBehavior(
            css\`
                .indeterminate-indicator-1,
                .determinate {
                    stroke: \${SystemColors.FieldText};
                }
                .background {
                    stroke: \${SystemColors.Field};
                }
                :host([paused]) .indeterminate-indicator-1 {
                    stroke: \${SystemColors.Field};
                }
                :host([paused]) .determinate {
                    stroke: \${SystemColors.GrayText};
                }
            \`
        )
    );
`;
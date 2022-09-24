import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { css, ElementStyles } from "@microsoft/fast-element";
import {
    display,
    forcedColorsStylesheetBehavior,
    FoundationElementTemplate,
} from "@microsoft/fast-foundation";
import { SystemColors } from "@microsoft/fast-web-utilities";
import {
    accentFillRest,
    // heightNumber,
    neutralForegroundHint,
} from "@microsoft/adaptive-ui";
import { heightNumber } from "../../design-system.js";

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
            align-items: center;
            outline: none;
            height: calc(\${heightNumber} * 1px);
            width: calc(\${heightNumber} * 1px);
        }
        .progress {
            height: 100%;
            width: 100%;
        }
        .background {
            fill: none;
            stroke-width: 2px;
        }
        .determinate {
            stroke: \${accentFillRest};
            fill: none;
            stroke-width: 2px;
            stroke-linecap: round;
            transform-origin: 50% 50%;
            transform: rotate(-90deg);
            transition: all 0.2s ease-in-out;
        }
        .indeterminate-indicator-1 {
            stroke: \${accentFillRest};
            fill: none;
            stroke-width: 2px;
            stroke-linecap: round;
            transform-origin: 50% 50%;
            transform: rotate(-90deg);
            transition: all 0.2s ease-in-out;
            animation: spin-infinite 2s linear infinite;
        }
        :host(.paused) .indeterminate-indicator-1 {
            animation: none;
            stroke: \${neutralForegroundHint};
        }
        :host(.paused) .determinate {
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
                .background {
                    stroke: \${SystemColors.Field};
                }
                .determinate,
                .indeterminate-indicator-1 {
                    stroke: \${SystemColors.ButtonText};
                }
                :host(.paused) .determinate,
                :host(.paused) .indeterminate-indicator-1 {
                    stroke: \${SystemColors.GrayText};
                }
            \`,
        ),
    )
`;
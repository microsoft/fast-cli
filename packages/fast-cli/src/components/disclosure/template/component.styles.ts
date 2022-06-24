import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { css, ElementStyles } from "@microsoft/fast-element";
import type { FoundationElementTemplate } from "@microsoft/fast-foundation";
import {
    accentFillActive,
    accentFillHover,
    accentFillRest,
    accentForegroundActive,
    accentForegroundHover,
    accentForegroundRest,
    controlCornerRadius,
    foregroundOnAccentActive,
    foregroundOnAccentHover,
    foregroundOnAccentRest,
    strokeWidth,
    typeRampBase,
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
        .disclosure {
            transition: height 0.35s;
        }
        .disclosure .invoker::-webkit-details-marker {
            display: none;
        }
        .disclosure .invoker {
            list-style-type: none;
            \${typeRampBase}
        }
        :host([appearance="accent"]) .invoker {
            background: \${accentFillRest};
            color: \${foregroundOnAccentRest};
            border-radius: calc(\${controlCornerRadius} * 1px);
            outline: none;
            cursor: pointer;
            margin: 16px 0;
            padding: 12px;
            max-width: max-content;
        }
        :host([appearance="accent"]) .invoker:active {
            background: \${accentFillActive};
            color: \${foregroundOnAccentActive};
        }
        :host([appearance="accent"]) .invoker:hover {
            background: \${accentFillHover};
            color: \${foregroundOnAccentHover};
        }
        :host([appearance="lightweight"]) .invoker {
            background: transparent;
            color: \${accentForegroundRest};
            border-bottom: calc(\${strokeWidth} * 1px) solid \${accentForegroundRest};
            cursor: pointer;
            width: max-content;
            margin: 16px 0;
        }
        :host([appearance="lightweight"]) .invoker:active {
            border-bottom-color: \${accentForegroundActive};
        }
        :host([appearance="lightweight"]) .invoker:hover {
            border-bottom-color: \${accentForegroundHover};
        }
        .disclosure[open] .invoker ~ * {
            animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    \`;`
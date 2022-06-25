import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { css, ElementStyles } from "@microsoft/fast-element";
import {
    Badge,
    display,
    FoundationElementTemplate,
} from "@microsoft/fast-foundation";
import {
    // baseHeightMultiplier,
    controlCornerRadius,
    // DirectionalStyleSheetBehavior,
    // density,
    designUnit,
    neutralForegroundRest,
    typeRampBaseFontSize,
} from "@microsoft/adaptive-ui";

const rtl = (context, definition) => css\`
    ::slotted(\${context.tagFor(Badge)}) {
        left: 0;
    }
\`;

const ltr = (context, definition) => css\`
    ::slotted(\${context.tagFor(Badge)}) {
        right: 0;
    }
\`;

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
            position: relative;
            height: var(--avatar-size, var(--avatar-size-default));
            max-width: var(--avatar-size, var(--avatar-size-default));
            ${
                // --avatar-size-default: calc(
                //     (
                //             (${baseHeightMultiplier} + ${density}) * ${designUnit} +
                //                 ((${designUnit} * 8) - 40)
                //         ) * 1px
                // );
                ""
            }
            --avatar-text-size: \${typeRampBaseFontSize};
            --avatar-text-ratio: \${designUnit};
        }
        .link {
            text-decoration: none;
            color: \${neutralForegroundRest};
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            min-width: 100%;
        }
        .square {
            border-radius: calc(\${controlCornerRadius} * 1px);
            min-width: 100%;
            overflow: hidden;
        }
        .circle {
            border-radius: 100%;
            min-width: 100%;
            overflow: hidden;
        }
        .backplate {
            position: relative;
            display: flex;
        }
        .media,
        ::slotted(img) {
            max-width: 100%;
            position: absolute;
            display: block;
        }
        .content {
            font-size: calc(
                (var(--avatar-text-size) + var(--avatar-size, var(--avatar-size-default))) /
                    var(--avatar-text-ratio)
            );
            line-height: var(--avatar-size, var(--avatar-size-default));
            display: block;
            min-height: var(--avatar-size, var(--avatar-size-default));
        }
        ::slotted(\${context.tagFor(Badge)}) {
            position: absolute;
            display: block;
        }
        \`.withBehaviors(
            // new DirectionalStyleSheetBehavior(
            //     ltr(context, definition),
            //     rtl(context, definition)
            // )
        );`
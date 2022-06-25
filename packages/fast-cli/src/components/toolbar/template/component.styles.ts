import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { css, ElementStyles } from "@microsoft/fast-element";
import {
    display,
    focusVisible,
    forcedColorsStylesheetBehavior,
    FoundationElementTemplate,
} from "@microsoft/fast-foundation";
import { SystemColors } from "@microsoft/fast-web-utilities";
import {
    designUnit,
    fillColor,
    focusStrokeWidth,
    neutralStrokeFocus,
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
        \${display('inline-flex')} :host {
            --toolbar-item-gap: calc(\${designUnit} * 1px);
            background: \${fillColor};
            fill: currentcolor;
            padding: var(--toolbar-item-gap);
            box-sizing: border-box;
            align-items: center;
        }
        :host(\${focusVisible}) {
            outline: calc(\${strokeWidth} * 1px) solid \${neutralStrokeFocus};
        }
        .positioning-region {
            align-items: center;
            display: inline-flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            flex-grow: 1;
        }
        :host([orientation='vertical']) .positioning-region {
            flex-direction: column;
            align-items: start;
        }
        ::slotted(:not([slot])) {
            flex: 0 0 auto;
            margin: 0 var(--toolbar-item-gap);
        }
        :host([orientation='vertical']) ::slotted(:not([slot])) {
            margin: var(--toolbar-item-gap) 0;
        }
        :host([orientation='vertical']) {
            display: inline-flex;
            flex-direction: column;
        }
        .start,
        .end {
            display: flex;
            align-items: center;
        }
        .end {
            margin-inline-start: auto;
        }
        .start__hidden,
        .end__hidden {
            display: none;
        }
        ::slotted(svg) {
            \${/* Glyph size is temporary - replace when adaptive typography is figured out */ ''}
            width: 16px;
            height: 16px;
        }
    \`.withBehaviors(
        forcedColorsStylesheetBehavior(
            css\`
                :host(:\${focusVisible}) {
                    box-shadow: 0 0 0 calc(\${focusStrokeWidth} * 1px) \${SystemColors.Highlight};
                    color: \${SystemColors.ButtonText};
                    forced-color-adjust: none;
                }
            \`,
        ),
    );`;
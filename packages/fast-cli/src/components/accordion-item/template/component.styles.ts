import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { css, ElementStyles } from "@microsoft/fast-element";
import {
    display,
    DesignToken,
    focusVisible,
    forcedColorsStylesheetBehavior,
    FoundationElementTemplate,
} from "@microsoft/fast-foundation";
import { SystemColors } from "@microsoft/fast-web-utilities";
import {
    controlCornerRadius,
    designUnit,
    focusStrokeOuter,
    focusStrokeWidth,
    layerCornerRadius,
    // neutralFillLayerAltRest,
    // neutralFillLayerRecipe,
    // neutralFillLayerRest,
    neutralFillStealthRecipe,
    neutralForegroundRest,
    // neutralStrokeLayerRest,
    strokeWidth,
    Swatch,
    typeRampBase,
} from "@microsoft/adaptive-ui";
import { heightNumber } from "../../design-system.js";

// const neutralFillStealthRestOnNeutralFillLayerRest = DesignToken.create<Swatch>(
//     "neutral-fill-stealth-rest-on-neutral-fill-layer-rest",
// ).withDefault((target: HTMLElement) => {
//     const baseRecipe = neutralFillLayerRecipe.getValueFor(target);
//     const buttonRecipe = neutralFillStealthRecipe.getValueFor(target);
//     return buttonRecipe.evaluate(target, baseRecipe.evaluate(target).rest).rest;
// });
  
// const neutralFillStealthHoverOnNeutralFillLayerRest = DesignToken.create<Swatch>(
//     "neutral-fill-stealth-hover-on-neutral-fill-layer-rest",
// ).withDefault((target: HTMLElement) => {
//     const baseRecipe = neutralFillLayerRecipe.getValueFor(target);
//     const buttonRecipe = neutralFillStealthRecipe.getValueFor(target);
//     return buttonRecipe.evaluate(target, baseRecipe.evaluate(target).rest).hover;
// });
  
// const neutralFillStealthActiveOnNeutralFillLayerRest = DesignToken.create<Swatch>(
//     "neutral-fill-stealth-active-on-neutral-fill-layer-rest",
// ).withDefault((target: HTMLElement) => {
//     const baseRecipe = neutralFillLayerRecipe.getValueFor(target);
//     const buttonRecipe = neutralFillStealthRecipe.getValueFor(target);
//     return buttonRecipe.evaluate(target, baseRecipe.evaluate(target).rest).active;
// });

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
            box-sizing: border-box;
            \${typeRampBase}
            flex-direction: column;
            ${
                // background: ${neutralFillLayerRest};
                // border: calc(${strokeWidth} * 1px) solid ${neutralStrokeLayerRest};
                ""
            }
            color: \${neutralForegroundRest};
            border-radius: calc(\${layerCornerRadius} * 1px);
        }
        .region {
            display: none;
            padding: calc(\${designUnit} * 2 * 1px);
            ${
                // background: ${neutralFillLayerAltRest};
                ""
            }
        }
        .heading {
            display: grid;
            position: relative;
            grid-template-columns: auto 1fr auto auto;
            align-items: center;
        }
        .button {
            appearance: none;
            border: none;
            background: none;
            grid-column: 2;
            grid-row: 1;
            outline: none;
            margin: calc(\${designUnit} * 3 * 1px) 0;
            padding: 0 calc(\${designUnit} * 2 * 1px);
            text-align: left;
            color: inherit;
            cursor: pointer;
            font: inherit;
        }
        .button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            cursor: pointer;
        }
        .button:\${focusVisible}::before {
            outline: none;
            border: calc(\${strokeWidth} * 1px) solid \${focusStrokeOuter};
            border-radius: calc(\${layerCornerRadius} * 1px);
            box-shadow: 0 0 0 calc((\${focusStrokeWidth} - \${strokeWidth}) * 1px) \${focusStrokeOuter};
        }
        :host(.expanded) .button:\${focusVisible}::before {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
        :host(.expanded) .region {
            display: block;
            ${
                // border-top: calc(${strokeWidth} * 1px) solid ${neutralStrokeLayerRest};
                ""
            }
            border-bottom-left-radius: calc((\${layerCornerRadius} - \${strokeWidth}) * 1px);
            border-bottom-right-radius: calc((\${layerCornerRadius} - \${strokeWidth}) * 1px);
        }
        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            grid-column: 4;
            pointer-events: none;
            ${
                // background: ${neutralFillStealthRestOnNeutralFillLayerRest};
                ""
            }
            width: calc(\${heightNumber} * 1px);
            height: calc(\${heightNumber} * 1px);
            border-radius: calc(\${controlCornerRadius} * 1px);
            fill: currentcolor;
            margin: calc(\${designUnit} * 2 * 1px);
        }
        .heading:hover .icon {
            ${
                // background: ${neutralFillStealthHoverOnNeutralFillLayerRest};
                ""
            }
        }
        .heading:active .icon {
            ${
                // background: ${neutralFillStealthActiveOnNeutralFillLayerRest};
                ""
            }
        }
        slot[name='collapsed-icon'] {
            display: flex;
        }
        :host(.expanded) slot[name='collapsed-icon'] {
            display: none;
        }
        slot[name='expanded-icon'] {
            display: none;
        }
        :host(.expanded) slot[name='expanded-icon'] {
            display: flex;
        }
        .start {
            display: flex;
            align-items: center;
            padding-inline-start: calc(\${designUnit} * 2 * 1px);
            justify-content: center;
            grid-column: 1;
        }
        .end {
            display: flex;
            align-items: center;
            justify-content: center;
            grid-column: 3;
        }
        .icon,
        .start,
        .end {
            position: relative;
        }
    \`.withBehaviors(
        forcedColorsStylesheetBehavior(
            css\`
                .button:\${focusVisible}::before {
                    border-color: \${SystemColors.Highlight};
                    box-shadow: 0 0 0 calc((\${focusStrokeWidth} - \${strokeWidth}) * 1px) \${SystemColors.Highlight};
                }
                .icon {
                    fill: \${SystemColors.ButtonText};
                }
            \`,
        ),
    );`
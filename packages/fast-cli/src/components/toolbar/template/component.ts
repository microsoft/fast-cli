import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { composedParent, Toolbar as FoundationToolbar } from "@microsoft/fast-foundation";
import type { Swatch } from "@microsoft/adaptive-ui/dist/dts/color/swatch.d.js"
import { fillColor, neutralFillLayerRecipe } from "@microsoft/adaptive-ui";

/**
 * A class derived from the Toolbar foundation component
 */
export class ${config.className} extends FoundationToolbar {
    connectedCallback() {
        super.connectedCallback();

        const parent = composedParent(this);

        if (parent) {
            fillColor.setValueFor(
                this,
                (target: HTMLElement): Swatch =>
                    neutralFillLayerRecipe
                        .getValueFor(target)
                        .evaluate(target, fillColor.getValueFor(parent))
            );
        }
    }
};`
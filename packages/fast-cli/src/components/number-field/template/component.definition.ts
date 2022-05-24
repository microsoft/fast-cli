import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => 
`import { template } from "./${config.tagName}.template.js";
import { styles } from "./${config.tagName}.styles.js";

export const definition = {
    baseName: "${config.tagName}",
    template,
    styles,
    shadowOptions: {
        delegatesFocus: true,
    },
    stepDownGlyph: /* html */ \`
        <span class="step-down-glyph" part="step-down-glyph"></span>
    \`,
    stepUpGlyph: /* html */ \`
        <span class="step-up-glyph" part="step-up-glyph"></span>
    \`,
}`; 
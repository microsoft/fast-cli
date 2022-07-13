import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { template } from "./${c => c.tagName}.template.js";
import { styles } from "./${c => c.tagName}.styles.js";

export const definition = {
    baseName: "${c => c.tagName}",
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
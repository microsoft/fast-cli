import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { template } from "./${c => c.tagName}.template.js";
import { styles } from "./${c => c.tagName}.styles.js";

export const definition = {
    baseName: "${c => c.tagName}",
    template,
    styles,
    indeterminateIndicator1: /* html */ \`
        <span class="indeterminate-indicator-1" part="indeterminate-indicator-1"></span>
    \`,
    indeterminateIndicator2: /* html */ \`
        <span class="indeterminate-indicator-1" part="indeterminate-indicator-1"></span>
    \`,
}`; 
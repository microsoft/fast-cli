import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => 
`import { template } from "./${config.tagName}.template.js";
import { styles } from "./${config.tagName}.styles.js";

export const definition = {
    baseName: "${config.tagName}",
    template,
    styles,
    indeterminateIndicator1: /* html */ \`
        <span class="indeterminate-indicator-1" part="indeterminate-indicator-1"></span>
    \`,
    indeterminateIndicator2: /* html */ \`
        <span class="indeterminate-indicator-1" part="indeterminate-indicator-1"></span>
    \`,
}`; 
import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => 
`import { template } from "./${config.tagName}.template.js";
import { styles } from "./${config.tagName}.styles.js";

export const definition = {
    baseName: "${config.tagName}",
    template,
    styles,
    switch: /* html */ \`
        <span class="checked-indicator" part="checked-indicator"></span>
    \`,
};`;
import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { template } from "./${config.tagName}.template.js";
import { styles } from "./${config.tagName}.styles.js";

export default {
    name: "${config.tagName}",
    template,
    styles
}`;
import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { template } from "./${c => c.tagName}.template.js";
import { styles } from "./${c => c.tagName}.styles.js";

export const definition = {
    baseName: "${c => c.tagName}",
    template,
    styles,
};`;
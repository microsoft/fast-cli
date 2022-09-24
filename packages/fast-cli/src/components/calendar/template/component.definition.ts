import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { template } from "./${c => c.tagName}.template.js";
import { styles } from "./${c => c.tagName}.styles.js";
import { CalendarTitleTemplate } from "@microsoft/fast-foundation";

export const definition = {
    baseName: "${c => c.tagName}",
    template,
    styles,
    title: CalendarTitleTemplate,
};`;
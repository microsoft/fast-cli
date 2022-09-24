import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { template } from "./${c => c.tagName}.template.js";
import { styles } from "./${c => c.tagName}.styles.js";

export const definition = {
    baseName: "${c => c.tagName}",
    template,
    styles,
    next: /* html */ \`
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4.023 15.273L11.29 8 4.023.727l.704-.704L12.71 8l-7.984 7.977-.704-.704z"
            />
        </svg>
    \`,
    previous: /* html */ \`
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.273 15.977L3.29 8 11.273.023l.704.704L4.71 8l7.266 7.273-.704.704z"
            />
        </svg>
    \`,
}`;
import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => 
`import { template } from "./${config.tagName}.template.js";
import { styles } from "./${config.tagName}.styles.js";
import { Avatar } from "@microsoft/fast-foundation";

export const definition = {
    baseName: "${config.tagName}",
    baseClass: ,
    template,
    styles,
    media: html<Avatar>\`
        \${when(
            x => x.imgSrc,
            html\`
                <img
                    src="\${x => x.imgSrc}"
                    alt="\${x => x.alt}"
                    slot="media"
                    class="media"
                    part="media"
                />
            \`
        )}
    \`,
    shadowOptions: {
        delegatesFocus: true,
    },
};`;
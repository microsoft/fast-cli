import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => 
`import { template } from "./${config.tagName}.template.js";
import { styles } from "./${config.tagName}.styles.js";
import type { ${config.className} } from "./${config.tagName}.js";
import { html, when } from "@microsoft/fast-element";
import { Avatar as FoundationAvatar } from "@microsoft/fast-foundation";

export const definition = {
    baseName: "${config.tagName}",
    baseClass: FoundationAvatar,
    template,
    styles,
    media: html<${config.className}>\`
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
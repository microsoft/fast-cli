import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { template } from "./${c => c.tagName}.template.js";
import { styles } from "./${c => c.tagName}.styles.js";
import type { ${c => c.className} } from "./${c => c.tagName}.js";
import { html, when } from "@microsoft/fast-element";
import { Avatar as FoundationAvatar } from "@microsoft/fast-foundation";

export const definition = {
    baseName: "${c => c.tagName}",
    baseClass: FoundationAvatar,
    template,
    styles,
    media: html<${c => c.className}>\`
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
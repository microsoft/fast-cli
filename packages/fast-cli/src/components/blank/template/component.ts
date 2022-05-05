import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
import { customElement, FASTElement } from "@microsoft/fast-element";
import { template } from "./${config.tagName}.template.js";
import { styles } from "./${config.tagName}.styles.js";

/**
 * A Custom HTML Element.
 *
 * @public
 */
@customElement({
    name: "${config.tagName}",
    template,
    styles
})
export class ${config.className} extends FASTElement {}
`;
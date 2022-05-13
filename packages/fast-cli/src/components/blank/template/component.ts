import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { customElement, FASTElement } from "@microsoft/fast-element";
import definition from "./${config.tagName}.definition.js";

/**
 * A Custom HTML Element.
 *
 * @public
 */
@customElement(definition)
export class ${config.className} extends FASTElement {}
`;
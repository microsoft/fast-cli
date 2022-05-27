import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { FoundationElement } from "@microsoft/fast-foundation";

/**
 * A Custom HTML Element.
 *
 * @public
 */
 /**
  * A class derived from the FoundationElement
  */
 export class ${config.className} extends FoundationElement {};`;
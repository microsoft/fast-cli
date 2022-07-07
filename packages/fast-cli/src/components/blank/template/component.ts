import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { FoundationElement } from "@microsoft/fast-foundation";

/**
 * A Custom HTML Element.
 *
 * @public
 */
 /**
  * A class derived from the FoundationElement
  */
 export class ${c => c.className} extends FoundationElement {};`;
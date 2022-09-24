import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { Flipper as FoundationFlipper } from "@microsoft/fast-foundation";
/**
 * A class derived from the Flipper foundation component
 */
export class ${c => c.className} extends FoundationFlipper {};` 
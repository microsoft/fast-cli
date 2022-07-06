import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { Checkbox as FoundationCheckbox } from "@microsoft/fast-foundation";
/**
 * A class derived from the Checkbox foundation component
 */
export class ${c => c.className} extends FoundationCheckbox {};` 
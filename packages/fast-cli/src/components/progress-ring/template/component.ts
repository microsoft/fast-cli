import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { BaseProgress } from "@microsoft/fast-foundation";
/**
 * A class derived from the BaseProgress foundation component
 */
export class ${c => c.className} extends BaseProgress {};` 
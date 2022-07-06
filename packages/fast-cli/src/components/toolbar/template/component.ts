import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { composedParent, Toolbar as FoundationToolbar } from "@microsoft/fast-foundation";

/**
 * A class derived from the Toolbar foundation component
 */
export class ${c => c.className} extends FoundationToolbar {};`
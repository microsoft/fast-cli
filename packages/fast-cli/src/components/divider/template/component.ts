import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { Divider as FoundationDivider } from "@microsoft/fast-foundation";

/**
 * A class derived from the Divider foundation component
 */
export class ${c => c.className} extends FoundationDivider {};`
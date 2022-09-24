import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { Badge as FoundationBadge } from "@microsoft/fast-foundation";

/**
 * A class derived from the Badge foundation component
 */
export class ${c => c.className} extends FoundationBadge {};`
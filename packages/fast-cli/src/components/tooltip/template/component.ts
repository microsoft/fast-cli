import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { Tooltip as FoundationTooltip } from "@microsoft/fast-foundation";

/**
 * A class derived from the Tooltip foundation component
 */
export class ${c => c.className} extends FoundationTooltip {};`
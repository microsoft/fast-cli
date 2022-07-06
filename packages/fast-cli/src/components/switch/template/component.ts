import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { Switch as FoundationSwitch } from "@microsoft/fast-foundation";

/**
 * A class derived from the Switch foundation component
 */
export class ${c => c.className} extends FoundationSwitch {};`
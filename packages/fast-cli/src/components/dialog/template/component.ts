import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { Dialog as FoundationDialog } from "@microsoft/fast-foundation";
/**
 * A class derived from the Dialog foundation component
 */
export class ${c => c.className} extends FoundationDialog {};` 
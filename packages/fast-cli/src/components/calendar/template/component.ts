import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { Calendar as FoundationCalendar } from "@microsoft/fast-foundation";

/**
 * A class derived from the Calendar foundation component
 */
export class ${c => c.className} extends FoundationCalendar {};`
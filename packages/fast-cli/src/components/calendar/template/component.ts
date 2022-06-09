import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Calendar as FoundationCalendar } from "@microsoft/fast-foundation";

/**
 * A class derived from the Calendar foundation component
 */
export class ${config.className} extends FoundationCalendar {};`
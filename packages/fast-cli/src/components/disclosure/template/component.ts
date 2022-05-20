import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Disclosure } from "@microsoft/fast-foundation";

/**
 * A class derived from the Disclosure foundation component
 */
export class ${config.className} extends Disclosure {};`
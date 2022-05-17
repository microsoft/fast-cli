import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { NumberField } from "@microsoft/fast-foundation";
/**
 * A class derived from the NumberField foundation component
 */
export class ${config.className} extends NumberField {};` 
import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Flipper } from "@microsoft/fast-foundation";
/**
 * A class derived from the Flipper foundation component
 */
export class ${config.className} extends Flipper {};` 
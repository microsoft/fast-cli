import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Flipper as FoundationFlipper } from "@microsoft/fast-foundation";
/**
 * A class derived from the Flipper foundation component
 */
export class ${config.className} extends FoundationFlipper {};` 
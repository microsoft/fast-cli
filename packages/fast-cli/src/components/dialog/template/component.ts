import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Dialog } from "@microsoft/fast-foundation";
/**
 * A class derived from the Dialog foundation component
 */
export class ${config.className} extends Dialog {};` 
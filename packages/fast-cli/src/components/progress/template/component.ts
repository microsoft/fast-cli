import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { BaseProgress } from "@microsoft/fast-foundation";
/**
 * A class derived from the BaseProgress foundation component
 */
export class ${config.className} extends BaseProgress {};` 
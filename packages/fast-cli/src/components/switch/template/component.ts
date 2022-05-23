import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Switch } from "@microsoft/fast-foundation";

/**
 * A class derived from the Switch foundation component
 */
export class ${config.className} extends Switch {};`
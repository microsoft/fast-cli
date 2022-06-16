import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `<${config.componentPrefix}-${config.tagName}></${config.componentPrefix}-${config.tagName}>`;
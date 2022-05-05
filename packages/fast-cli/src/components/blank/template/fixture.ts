import type { ComponentTemplateConfig } from "@microsoft/fast-cli";

export default (config: ComponentTemplateConfig): string => `<${config.tagName}></${config.tagName}>`;
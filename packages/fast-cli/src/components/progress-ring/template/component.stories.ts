import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
import Template from "./fixtures/base.html";
import { DesignSystem } from "@microsoft/fast-foundation";
import { ${config.definitionName} } from "./define.js";

DesignSystem.getOrCreate().withPrefix(
    "${config.componentPrefix}"
).register(
    ${config.definitionName}()
);

export default {
    title: "${config.tagName}",
};
export const ${config.className}: () => "*.html" = () => Template;
`; 
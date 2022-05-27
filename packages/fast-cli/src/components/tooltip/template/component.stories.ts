import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
import Template from "./fixtures/base.html";
import "./define.js";

export default {
    title: "${config.tagName}",
};

export const ${config.className}: () => "*.html" = () => Template;
`;
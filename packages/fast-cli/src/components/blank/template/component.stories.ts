import type { ComponentTemplateConfig } from "@microsoft/fast-cli";

export default (config: ComponentTemplateConfig): string => `
import Template from "./fixtures/base.html";
import "./define.js";

export default {
    title: "${config.tagName}",
};

export const ${config.className} = () => Template;
`;
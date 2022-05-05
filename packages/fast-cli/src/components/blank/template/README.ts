import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
# ${config.className}

Add a description of ${config.tagName}, use cases, and any attributes or API configuration options.
`;

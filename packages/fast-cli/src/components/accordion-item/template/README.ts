import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
# ${config.className}

The ${config.tagName} component is used in conjunction with ${config.tagName}.

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/accordion`;

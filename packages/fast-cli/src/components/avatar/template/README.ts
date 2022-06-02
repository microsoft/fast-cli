import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
# ${config.className}

The avatar component is used to visually represent a user or an object.

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/avatar`;

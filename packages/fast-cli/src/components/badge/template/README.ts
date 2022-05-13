import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
# ${config.className}

This component is used to highlight an item and attract attention or flag status.

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/badge`;

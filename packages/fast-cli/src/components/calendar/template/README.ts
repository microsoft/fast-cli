import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
# ${config.className}

An implementation of a calendar as a web-component.

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/calendar`;

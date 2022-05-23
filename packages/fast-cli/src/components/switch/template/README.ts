import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
# ${config.className}

An implementation of a [switch](https://w3c.github.io/aria/#switch) as a form-connected web-component.

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/switch`;

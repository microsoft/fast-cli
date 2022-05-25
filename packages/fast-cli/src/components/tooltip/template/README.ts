import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
# ${config.className}

An implementation of a [tooltip](https://w3c.github.io/aria-practices/#tooltip) web-component.

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/tooltip`;

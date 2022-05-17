import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
# ${config.className}

This web component is based on [Disclosure](https://w3c.github.io/aria-practices/#disclosure) specification. The component has a button or invoker which reveals the extra content on the click.

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/badge`;

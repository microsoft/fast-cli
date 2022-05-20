import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
# ${config.className}

A web component implementation of a [horizontal rule](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr).

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/divider`;

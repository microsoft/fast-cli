import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
# ${config.className}
A web component implementation of a [dialog](https://w3c.github.io/aria-practices/#dialog_modal).

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/card`;
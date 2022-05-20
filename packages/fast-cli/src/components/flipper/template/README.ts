import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
# ${config.className}
The flipper component is most often used to page through blocks of content or collections of UI elements.

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/card`;
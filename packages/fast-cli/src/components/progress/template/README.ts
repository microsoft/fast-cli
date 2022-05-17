import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
# ${config.className}
Progress components are used to display the length of time a process will take or to visualize percentage value (referred to as a **determinate** state) and to represent an unspecified wait time (referred to as an **indeterminate** state). This progress component should be used for a linear visual appearance.

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/card`;
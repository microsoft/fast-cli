import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
# ${config.className}
The \`${config.tagName}\` component is a visual container. By default \`${config.tagName}\` applies \`neutralFillLayerRecipe\` to its background that is calculated from its parent's fill color. Cards are snapshots of content that are typically used in a group to present collections of related information.

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/card`;